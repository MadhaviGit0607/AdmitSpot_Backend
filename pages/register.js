export default function Register() {
    return (
      <div>
        <h1>Register</h1>
        <form method="POST" action="/api/auth/register">
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
  