# Null4U

```shell
source bootstrap.sh # Sets up AWS S3 and DynamoDB for Terraform backend

cp terraform/env/terraform.tfvars.example terraform/env/terraform.tfvars # Create your own tfvars file

terraform init
terraform apply -var-file=terraform/env/terraform.tfvars --auto-approve
```

![architecture](./assets/diagram.png)
