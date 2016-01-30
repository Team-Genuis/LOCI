#!/bin/bash
# Deploy webapp
export AWS_DEFAULT_REGION=us-west-2
# Deploy ember app to s3
aws s3 sync ./build s3://loci.selby.io
echo "https://loci.selby.io/"
