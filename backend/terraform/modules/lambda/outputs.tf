output "lambda_function_names" {
  value = { for k, v in aws_lambda_function.this : k => v.function_name }
}

output "lambda_invoke_arns" {
  value = { for k, v in aws_lambda_function.this : k => v.invoke_arn }
}

output "lambda_arns" {
  value = { for k, v in aws_lambda_function.this : k => v.arn }
}

output "lambda_role_arn" {
  value = aws_iam_role.lambda_role.arn
}
