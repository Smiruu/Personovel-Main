from rest_framework import renderers
import json
from datetime import datetime

class UserRenderer(renderers.JSONRenderer):
    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''
        if 'ErrorDetail' in str(data):
            response = json.dumps({'errors': data})
        else:
            # Custom serialization for datetime objects
            response = self.serialize_datetime(data)

        return response

    def serialize_datetime(self, data):
        # Function to serialize datetime objects
        if isinstance(data, dict):
            # Check if the data is a dictionary
            for key, value in data.items():
                if isinstance(value, datetime):
                    # Convert datetime object to string
                    data[key] = value.strftime('%Y-%m-%d %H:%M:%S')
                elif isinstance(value, dict):
                    # Recursively call serialize_datetime for nested dictionaries
                    self.serialize_datetime(value)
        elif isinstance(data, list):
            # Check if the data is a list
            for item in data:
                self.serialize_datetime(item)
        elif isinstance(data, datetime):
            # Convert datetime object to string
            data = data.strftime('%Y-%m-%d %H:%M:%S')

        # Serialize the modified data to JSON
        return json.dumps(data)
