variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-2"
}

variable "project_name" {
  description = "Resource naming prefix (human-friendly)."
  type        = string
  default     = "serverless-board"
}

variable "tags" {
  description = "Common tags to apply to resources."
  type        = map(string)
  default     = {}
}

variable "cors_allow_origins" {
  description = "CORS allow origins for API Gateway."
  type        = list(string)
  default     = ["*"]
}

variable "cors_allow_headers" {
  description = "CORS allow headers for API Gateway."
  type        = list(string)
  default     = ["content-type"]
}

variable "cors_allow_methods" {
  description = "CORS allow methods for API Gateway."
  type        = list(string)
  default     = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}
