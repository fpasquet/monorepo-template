# Infrastructure

This directory contains Terraform configuration for AWS resources used by the project.

## Usage

1. Copy `terraform.tfvars.example` to `terraform.tfvars` and update the values.
2. Initialize Terraform:

   ```sh
   terraform init
   ```

3. Review the plan and apply:

   ```sh
   terraform plan
   terraform apply
   ```

Ensure you have AWS credentials configured (via environment variables or an AWS profile).
