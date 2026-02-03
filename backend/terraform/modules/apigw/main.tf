resource "aws_apigatewayv2_api" "this" {
  name          = "${var.name_prefix}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = var.cors_allow_origins
    allow_headers = var.cors_allow_headers
    allow_methods = var.cors_allow_methods
    max_age       = 3600
  }

  tags = var.tags
}

locals {
  routes = {
    "GET /announcements"      = { lambda_key = "list_announcements" }
    "GET /announcements/{id}" = { lambda_key = "get_announcement" }

    "GET /board"         = { lambda_key = "list_board_posts" }
    "GET /board/{id}"    = { lambda_key = "get_board_post" }
    "POST /board"        = { lambda_key = "create_board_post" }
    "PUT /board/{id}"    = { lambda_key = "update_board_post" }
    "DELETE /board/{id}" = { lambda_key = "delete_board_post" }
  }

  lambda_keys = toset([for _, v in local.routes : v.lambda_key])
}

resource "aws_apigatewayv2_integration" "lambda" {
  for_each = local.lambda_keys

  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_uri        = var.lambda_invoke_arns[each.key]
  payload_format_version = "2.0"
  timeout_milliseconds   = 10000
}

resource "aws_apigatewayv2_route" "this" {
  for_each = local.routes

  api_id    = aws_apigatewayv2_api.this.id
  route_key = each.key
  target    = "integrations/${aws_apigatewayv2_integration.lambda[each.value.lambda_key].id}"
}

resource "aws_apigatewayv2_stage" "this" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = "$default"
  auto_deploy = true

  tags = var.tags
}

resource "aws_lambda_permission" "apigw" {
  for_each = local.lambda_keys

  statement_id  = "AllowExecutionFromAPIGatewayV2-${each.key}"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_names[each.key]
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.this.execution_arn}/*/*"
}
