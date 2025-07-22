# 📧 Email Notification Microservice

A horizontally scalable **NestJS microservice** that handles email notifications with support for:

- 🔁 Load balancing via **NGINX**
- 📈 Metrics collection with **Prometheus**
- 📊 Visualization with **Grafana**
- ♻️ Retry logic with fallback providers
- ⚡ Circuit breaker for fault resilience

---

## 📦 Features

- Sends emails using one or more providers (e.g., SendGrid, Mailgun, etc.)
- Exposes a RESTful `/send` endpoint
- Retries on failure and uses fallback providers
- Prometheus metrics with per-provider tracking
- Horizontal scalability via Docker Compose
- Load-balanced by NGINX with least connections

---

## 🚀 Getting Started

### 📁 Clone the repo

```bash
git clone https://github.com/your-org/email-microservice.git
cd email-microservice
```

### ⚙️ Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ▶️ Running the App

```bash
docker-compose up --build
```

This will spin up the following services:

| Service             | Port | Description                          |
| ------------------- | ---- | ------------------------------------ |
| email-service-1     | 3001 | First replica of the NestJS service  |
| email-service-2     | 3002 | Second replica of the NestJS service |
| NGINX Load Balancer | 8080 | Routes traffic to both services      |
| Prometheus          | 9090 | Prometheus UI                        |
| Grafana             | 3000 | Grafana dashboard                    |

---

## 🧪 API Usage

### `POST /send`

Send an email request:

```http
POST http://localhost:8080/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Hello",
  "body": "This is a test email"
}
```

Successful response:

```json
{
  "message": "Email sent successfully"
}
```

---

## 📊 Observability

### Prometheus

Access Prometheus at: [http://localhost:9090](http://localhost:9090)

Example metrics:

- `email_total{provider="sendgrid"}`
- `email_processing_duration_seconds_bucket{provider="mailgun"}`

### Grafana

Access Grafana at: [http://localhost:3000](http://localhost:3000)

- Default login:
  - **Username:** `admin`
  - **Password:** `admin`

- Add Prometheus as a data source:
  - URL: `http://prometheus:9090`

---

## 📁 File Structure

```
.
├── docker-compose.yml
├── prometheus.yml
├── nginx/
│   └── nginx.conf
└── src/
    ├── app.module.ts
    ├── email.service.ts
    ├── metrics/
    │   ├── metrics.module.ts
    │   └── metrics.service.ts
```

---

## 🧰 Environment Variables

In production, you should configure your email providers using `.env` or a secrets manager.

```env
PRIMARY_PROVIDER=sendgrid
SECONDARY_PROVIDER=mailgun
SENDGRID_API_KEY=xxx
MAILGUN_API_KEY=yyy
```

---

## 📦 Future Enhancements

- Rate limiting and throttling
- Kafka/NATS for event-driven email queueing
- UI dashboard for tracking email logs
- Health and readiness probes
- Auto-scaling in Kubernetes

---

## 🧑‍💻 Maintainers

- [Aditya Sharma](https://github.com/adityasharma55t)

---

## 📄 License

MIT License. See `LICENSE` file.

---
