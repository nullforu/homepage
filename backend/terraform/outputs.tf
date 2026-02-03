output "api_id" {
  description = "API Gateway HTTP API ID"
  value       = module.apigw.api_id
}

output "api_base_url" {
  description = "Base URL for API Gateway stage"
  value       = module.apigw.api_base_url
}

output "api_routes" {
  description = "Deployed API routes"
  value       = module.apigw.routes
}

output "dynamodb_table_name" {
  description = "DynamoDB table name"
  value       = module.dynamodb.table_name
}

output "name_prefix" {
  description = "Actual name prefix applied to resources (includes random suffix)."
  value       = local.name_prefix
}



output "lambda_functions" {
  description = "Map of lambda_key => function name"
  value       = module.lambda_api.lambda_function_names
}

output "lambda_invoke_arns" {
  description = "Map of lambda_key => invoke ARN"
  value       = module.lambda_api.lambda_invoke_arns
}
