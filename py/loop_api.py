import requests

url = 'https://api.foxe.vip/api/merkle/YOUR_ADDR'
search_string = '502'
output_file = 'output.txt'

while True:
    # Make request to URL
    response = requests.get(url)

    # Save response to file

    # Check if search string is in response
    if search_string in response.text or 'error' in response.text or 'try again' in response.text:
        pass
    else:

        with open(output_file, 'a') as f:
            f.write(response.text)
            sys.exit()
