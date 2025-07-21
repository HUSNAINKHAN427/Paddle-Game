const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");

        let ballX = 100;
        let ballY = 100;
        const ballRadius = 15;
        let ballSpeedX = 4;
        let ballSpeedY = 2;

        let paddleX = 200;
        const paddleWidth = 100;
        const paddleHeight = 10;
        const paddleY = canvas.height - paddleHeight - 10;
        let paddleSpeed = 0;

        function drawBall() {
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
        }

        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle();

            // Move Ball
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            // Ball collision with walls
            if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
                ballSpeedX = -ballSpeedX;
            }
            if (ballY - ballRadius < 0) {
                ballSpeedY = -ballSpeedY;
            }

            // Ball collision with paddle
            if (ballY + ballRadius >= paddleY &&
                ballX > paddleX && ballX < paddleX + paddleWidth) {
                ballSpeedY = -ballSpeedY;
            }

            // Game over
            if (ballY + ballRadius > canvas.height) {
                alert("Game Over!");
                document.location.reload();
            }

            // Move Paddle
            paddleX += paddleSpeed;
            if (paddleX < 0) paddleX = 0;
            if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;

            requestAnimationFrame(update);
        }

        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") paddleSpeed = 5;
            if (e.key === "ArrowLeft") paddleSpeed = -5;
        });

        document.addEventListener("keyup", function (e) {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") paddleSpeed = 0;
        });

        update();
