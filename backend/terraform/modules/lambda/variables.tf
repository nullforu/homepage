variable "name_prefix" {
  type        = string
  description = "Prefix for resource names."
}

variable "tags" {
  type        = map(string)
  description = "Tags"
  default     = {}
}

variable "table_name" {
  type        = string
  description = "DynamoDB table name"
}

variable "table_arn" {
  type        = string
  description = "DynamoDB table ARN"
}

variable "gsi1_name" {
  type        = string
  description = "GSI name for listing posts"
  default     = "gsi1"
}

variable "source_dir" {
  type        = string
  description = "Directory containing Lambda source files."
}

variable "functions" {
  type        = map(string)
  description = "Map of lambda_key => handler (e.g., handlers/listPosts.handler)."
}
