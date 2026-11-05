const API = 'http://localhost:3000/api';

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = document.getElementById('message');
    message.textContent = 'Signing in...';

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          role: document.getElementById('role').value
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const user = {
        _id: data._id,
        email: data.email,
        role: String(data.role || 'student').toLowerCase()
      };

      localStorage.setItem('queueLessToken', data.token);
      localStorage.setItem('queueLessUser', JSON.stringify(user));

      location.href = user.role === 'admin'
        ? 'admin.html'
        : 'student.html';

    } catch (err) {
      message.textContent = err.message;
    }
  });
}

function logout() {
  localStorage.removeItem('queueLessToken');
  localStorage.removeItem('queueLessUser');
  location.href = 'login.html';
}
