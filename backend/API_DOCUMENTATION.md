#EDUCATION MANAGEMENT INFORMATION SYSTEM (EMIS) API DOCUMENTATION

##Introduction
The EMIS is a system designed to finish almost all school's day to day operations.

##Purpose of EMIS APIs
    This API handles all EMIS back-end tasks for example Authentication & permissions for security, automatic school day to day operations.

##Base URL : 
    http://127.0.0.1:8000/ (production url will be provided)

##Authentication:
    JWT

##Target Audience:
    Kimtech Internal Team

##Authentication:
    To log in, provide the `username` and `password` fields to get the access token and the refresh token.
    Access token is used to log in and the refresh token is used to obtain a new access token when it gets expired.

#Endpoints:

    ##1. Access Token (Log In):
    ###Endpoint Url:    /token/
    ###HTTP method:     POST

    ###Request body:
    ```json
    {
        "username": your_username,
        "password": your_password
    }
    ```

    ###Response body:
    ```json
    {
        "refresh": refresh_token,
        "access": access_token
    }
    ```
    ###Status Code: 200, 201, 400, 403, 404, 500


    ##2. Create School Profile:
    ###Endpoint: /school/create-school/
    ###HTTP Method: POST
    ###Permissions: Any user

    ###Request Body:
    ```json
    {
        "username": prefered_school_username, //unique expected
        "email": school_email, 
        "password": school_password, 
        "school_name": name_of_school, 
        "motto": school_motto,
        "level": school_level, //Allowed choices: PRIMARY or SECONDARY -case sensitive "phone": school_contact_number, 
        "address": school_address,
        "district": district_of_location, 
        "region": region_of_location, // Choices: CENTRAL, EASTERN, SOUTHERN, WESTERN, and NORTHERN
        "website":school_website_if_exist,
        "reg_number": MoES_registration_number, 
        "UNEB_No": uneb_center_number, 
        "badge": school_badge_image
    }
    ```

    ###Response body:
    ```json
    {
        "username": "user2",
        "email": "ugkimtech2@gmail.com",
        "groups": [
            2
        ]
    }
    ```
    ###Status Code: 200, 201, 400, 403, 404, 500


    ##3. Fetch schools' profiles
    ###Endpoint URL:    /school/my-school/

    ###HTTP Method:  GET
    ###Permissions: If super admin, all shools are returned
                    If school admin, a specific school is returned

    ###Response body:
    ```json
    [
        {
            "id": 1,
            "username": "user1",
            "email": "ugkimtech2@gmail.com",
            "groups": [
                "school"
            ],
            "school_name": "my school22",
            "motto": "my motto22",
            "level": "SECONDARY",
            "phone": "01233",
            "address": "my address",
            "district": "kayunga",
            "region": "central",
            "website": "http://www.web.com",
            "reg_number": "reg0012",
            "UNEB_No": "uneb0012",
            "badge": "http://127.0.0.1:8000/media/badges/IMG_20251128_095338-1.jpg"
        }
    ]
    ```
    ###Status Code: 200, 201, 400, 403, 404, 500

    