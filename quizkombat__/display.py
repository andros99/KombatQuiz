import requests
from flask import Flask, render_template

app = Flask(__name__)
app.static_folder = 'static'
app.template_folder = 'templates'

@app.route('/')
def index():
    # API endpoint for current weather data
    url = 'https://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid=0e3b542e3216b92688e63244850b1add'
    
    # Your city name
    city = 'Oslo'
    
    # Make HTTP request to API endpoint
    response = requests.get(url.format(city)).json()
    
    # Extract relevant weather information from response
    weather = {
        'city': city,
        'description': response['weather'][0]['description'].capitalize(),
        'temperature': round(response['main']['temp']),
        'humidity': response['main']['humidity'],
        'pressure': response['main']['pressure'],
        'visibility': round(response['visibility'] / 1000, 1),
        'wind_speed': round(response['wind']['speed']),
        'wind_direction': response['wind']['deg']
    }
    
    # Render weather data using template
    return render_template('index.html', weather=weather)

if __name__ == '__main__':
    app.run()
