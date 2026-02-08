import React, { useState } from "react";

function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      console.log("API response:", data);

      setSuccess(true);
      setForm({ name: "", email: "", role: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>User Details Form</h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {success && <p style={styles.success}>User created successfully ✅</p>}
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
}

const styles = {
  form: {
    maxWidth: 320,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    border: "1px solid #ddd",
    padding: 16,
    borderRadius: 6
  },
  success: { color: "green" },
  error: { color: "red" }
};

export default UserForm;
