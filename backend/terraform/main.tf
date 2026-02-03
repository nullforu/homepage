provider "aws" {
  region = var.aws_region
}

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 3.5"
    }
    archive = {
      source  = "hashicorp/archive"
      version = ">= 2.4"
    }
  }

  backend "s3" {
    bucket = "null4u-home-page-bucket-64b0"
    key    = "terraform/state/terraform.tfstate"
    region = "ap-northeast-2"

    dynamodb_table = "null4u-home-page-table-64b0"
    encrypt        = true
  }
}

locals {
  name_prefix = "${var.project_name}-${random_string.suffix.result}"

  common_tags = merge(
    {
      Project = var.project_name
    },
    var.tags
  )
}

resource "random_string" "suffix" {
  length  = 6
  upper   = false
  special = false
}

module "dynamodb" {
  source       = "./modules/dynamodb"
  project_name = var.project_name
  tags         = local.common_tags
}

module "lambda_api" {
  source      = "./modules/lambda"
  name_prefix = local.name_prefix
  tags        = local.common_tags

  table_name = module.dynamodb.table_name
  table_arn  = module.dynamodb.table_arn
  gsi1_name  = module.dynamodb.gsi1_name

  source_dir = "${path.module}/../lambda"

  functions = {
    list_announcements = "handlers/listAnnouncements.handler"
    get_announcement   = "handlers/getAnnouncement.handler"
    list_board_posts   = "handlers/listBoardPosts.handler"
    get_board_post     = "handlers/getBoardPost.handler"
    create_board_post  = "handlers/createBoardPost.handler"
    update_board_post  = "handlers/updateBoardPost.handler"
    delete_board_post  = "handlers/deleteBoardPost.handler"
  }
}


module "apigw" {
  source      = "./modules/apigw"
  name_prefix = local.name_prefix
  tags        = local.common_tags

  lambda_function_names = module.lambda_api.lambda_function_names
  lambda_invoke_arns    = module.lambda_api.lambda_invoke_arns

  cors_allow_origins = var.cors_allow_origins
  cors_allow_headers = var.cors_allow_headers
  cors_allow_methods = var.cors_allow_methods
}
