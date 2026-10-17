<?php
// Practical 12: Session Management
session_start();

if (!isset($_SESSION['security_logged_in'])) {
    $_SESSION['security_logged_in'] = true;
    $_SESSION['staff_user'] = "Security Officer - KBTCOE Nashik";
}

// Practical 13: Database Connection
$host = "localhost";
$user = "root";
$pass = "";
$db   = "kbtcoe_safety_db";

$conn = @new mysqli($host, $user, $pass, $db);
$db_connected = !$conn->connect_error;

$message = "";

// Practical 12 & 13: Form Handling & Validation
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action_create'])) {
    $location = trim(htmlspecialchars($_POST['location']));
    $details  = trim(htmlspecialchars($_POST['details']));

    if (!empty($location)) {
        if ($db_connected) {
            $stmt = $conn->prepare("INSERT INTO incidents (location, details, status) VALUES (?, ?, 'Active')");
            $stmt->bind_param("ss", $location, $details);
            $stmt->execute();
            $message = "Patrol report inserted into MySQL database!";
        } else {
            $message = "Patrol Report Logged: " . strtoupper($location) . " - " . $details;
        }
    } else {
        $message = "Error: Location field cannot be empty.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MVPS KBTCOE - Security Patrol Module (PHP CRUD)</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h2 { color: #b91c1c; margin-top: 0; }
        .user-info { background: #fee2e2; color: #991b1b; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 20px; }
        label { display: block; margin-top: 10px; font-weight: 600; }
        input[type="text"], textarea { width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        button { margin-top: 15px; background: #b91c1c; color: white; border: none; padding: 12px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
    </style>
</head>
<body>
    <div class="container">
        <h2>MVPS KBTCOE Security Log (PHP CRUD)</h2>
        <div class="user-info">Logged in as: <?php echo htmlspecialchars($_SESSION['staff_user']); ?></div>
        <?php if (!empty($message)): ?><p style="color: green; font-weight: bold;"><?php echo $message; ?></p><?php endif; ?>
        <form method="POST" action="incidents.php">
            <label for="location">Campus Location:</label>
            <input type="text" id="location" name="location" placeholder="e.g. Mechanical Workshop, Floor 1" required>
            <label for="details">Patrol Observations:</label>
            <textarea id="details" name="details" rows="4" placeholder="Enter status observations..."></textarea>
            <button type="submit" name="action_create">Submit Patrol Log</button>
        </form>
    </div>
</body>
</html>