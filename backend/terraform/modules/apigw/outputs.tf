output "api_id" {
  value = aws_apigatewayv2_api.this.id
}

output "api_base_url" {
  value = aws_apigatewayv2_api.this.api_endpoint
}

output "routes" {
  value = keys(local.routes)
}
