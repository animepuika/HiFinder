<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to the Green Circle</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background: linear-gradient(to right, darkseagreen, yellowgreen);
            background-size: 100% 100%;
            animation: gradientAnimation 5s ease infinite;
        }

        /* Keyframes for the dynamic background animation */
        @keyframes gradientAnimation {
            0% {
                background-position: 10% 60%;
            }
            50% {
                background-position: 90% 40%;
            }
            100% {
                background-position: 10% 60%;
            }
        }

        .container {
            max-width: 550px;
            margin-top: 20px;
            border: 10px solid black;
            border-radius: 15px;
            padding: 0px;

        }

        .light {
            animation: colorChange 1s infinite;
        }

        @keyframes colorChange {
            0% {
                color: darkgreen;
            }
            50% {
                color: greenyellow;
            }
            100% {
                color: forestgreen;
            }
        }
        .jumbotron {
            background-color: #4ea44e;
            padding: 20px;
            text-align: center;
            margin: 0px;
            box-sizing: border-box;
        }

        h1{
            position: relative;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            font-weight: bold;
            color: black;
            border-color: black;
            border-style: outset;
            background-color: white;
            padding: 5px;
            margin: 0px;

        }

        p {
            font-size: 20px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #fff;
        }
        .highlight {
            color: #5bb75b;
            font-weight: bold;
        }
        .cta-button {
            display: inline-block;
            background-color: #4ca24c;
            color: #fff;
            font-size: 24px;
            padding: 14px 32px;
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }
        .cta-button:hover {
            background-color: #3b863b;
        }

        .image-container img {
            width: 100%;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .button {
            display: inline-block;
            background-color: black;
            color: yellowgreen;
            font-size: 18px;
            font-weight: bold;
            padding: 16px 32px;
            border: none;
            border-radius: 30px;
            box-shadow: 0px 7px 0 #2c7a2c;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            margin-top: 50px;
        }
        .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 2px 0 #3b803b;
            text-decoration: none;
            color: whitesmoke;
        }
        .button:active {
            transform: translateY(1px);
            box-shadow: none;
        }
        .logo {
            width: 200px;
            position: relative;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="jumbotron">
        <img src="logo.png" alt="Green Circle Logo" class="logo">
        <h1>Welcome to the H<span class="light">i</span>F<span class="light">i</span>nder!</h1>
        @if (Route::has('login'))
            <div>
                @auth
                @else
                    <a href="{{ route('login') }}" class="button">Log in</a>

                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="button">Register</a>
                    @endif
                @endauth
            </div>
        @endif
    </div>
</div>

</body>
</html>









