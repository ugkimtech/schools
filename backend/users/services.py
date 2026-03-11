import random
import string


class IDGenerator:
    def staff_ID(self, id, prefix, additional_length):
        return f'{str(prefix)}{str(id).zfill(additional_length)}'
    
    def student_ID(self, id, prefix, additional_length):
        return f'{str(prefix)}{str(id).zfill(additional_length)}'

def generate_password():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=5))