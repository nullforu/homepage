variable "name_prefix" {
  type        = string
  description = "Prefix for resource names."
}

variable "tags" {
  type        = map(string)
  description = "Tags"
  default     = {}
}

variable "lambda_function_names" {
  type        = map(string)
  description = "Map of lambda_key => function name"
}

variable "lambda_invoke_arns" {
  type        = map(string)
  description = "Map of lambda_key => invoke ARN"
}

variable "cors_allow_origins" {
  type        = list(string)
  description = "CORS allow origins"
  default     = ["*"]
}

variable "cors_allow_headers" {
  type        = list(string)
  description = "CORS allow headers"
  default     = ["content-type"]
}

variable "cors_allow_methods" {
  type        = list(string)
  description = "CORS allow methods"
  default     = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}
