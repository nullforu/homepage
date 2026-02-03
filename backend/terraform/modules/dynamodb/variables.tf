variable "project_name" {
  type        = string
  description = "Prefix for resource names."
}

variable "gsi1_name" {
  type        = string
  description = "GSI name for posts listing."
  default     = "gsi1"
}

variable "tags" {
  type        = map(string)
  description = "Tags"
  default     = {}
}
