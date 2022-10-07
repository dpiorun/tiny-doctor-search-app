# Tiny app from scratch
The app contains a backend built with python and Django framework and a frontend built with Typescript and Create-React-App. A user has access to a simple form and is able to perform a search for a doctor in the following fields: city, facility, and area of expertise. Filtered doctors are shown below the form after a successful endpoint hit.
# How to run the app locally
Clone this git repository.
Create `/.env` files and provide credential data, like in `.env.example`. 
There are online Django secret key generators on the web.

## Backend
Create a virtual environment to isolate your package dependencies locally.
In `./` run:
```shell
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
```

Install requirements for the backend:
```shell
cd backend
pip install -r requirements.txt
```

Create an empty database file `db.sqlite3` in `./backend`.
Apply migrations and populate the database:
```shell
python3 manage.py migrate
python3 manage.py loaddata fixtures/doctors.json
```

Run a development server:
```shell
python3 manage.py runserver
```

## Frontend
In `./frontend` directory run:
```shell
npm install
npm start
```

Enjoy on http://localhost:3000

# Testing
In `./backend`:
```shell
pytest .
```

In `./frontend`:
```shell
npm test
```

# Development
To unify code formatting:
in `./backend` run
```shell
black .
```
in `./frontend` folder run
```shell
npx prettier --write .
```

