import boto3

ses_client = boto3.client('ses', region_name='us-east-1')

raw_email_data = {
    'Source': 'chandana.tippiri@kansocloud.com',  # Should be a verified email address
    'RawMessage': {
        'Data': 'Your raw email message data here.'
    }
}

try:
    response = ses_client.send_raw_email(**raw_email_data)
    print("Email sent! Response:", response)
except Exception as e:
    print(f"Error: {e}")
