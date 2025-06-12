# Solutia SWES Reservation App

This is a front-end assessment project built as part of the recruitment process for **Solutia s.r.o.**. The application allows creating equipment reservations, viewing reservation history, and checking availability in a calendar view.

---

## ✅ Implemented Use Cases

* **UC-R1**: Create Reservation Form
* **UC-R5**: Equipment Overview & History List View
* **UC-R12**: Calendar View for Available Dates

---

## 🚀 Live URL

**[https://solutia-swes-reservation-e5fy.vercel.app/](https://solutia-swes-reservation-e5fy.vercel.app/)**

## 📦 Repository

**[https://github.com/syedshahidashiqali/solutia-swes-reservation/](https://github.com/syedshahidashiqali/solutia-swes-reservation/)**

## 🐳 Docker Image

You can run this app using Docker:

**[https://hub.docker.com/r/syedshahidashiqali/solutia-reservation-assessment](https://hub.docker.com/r/syedshahidashiqali/solutia-reservation-assessment)**

```bash
docker pull syedshahidashiqali/solutia-reservation-assessment
docker run -p 3000:3000 syedshahidashiqali/solutia-reservation-assessment
```

---

## 🛠 Tech Stack

* **Next.js** (App Router)
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**

## 🧪 Features

### UC-R1: Reservation Form

* Fields: Employee ID, Item Dropdown, Date Picker
* Client-side validation
* Mock POST `/api/reservations`

### UC-R5: Equipment Overview & History

* Responsive table with:

  * Filter controls (date, type, status, search)
  * Pagination (10/25/50)
  * Sorting by columns
  * Status indicators
  * Loading and empty states

### UC-R12: Calendar View

* Monthly view with:

  * Available/unavailable day highlights
  * Click to prefill reservation date

---

## 📦 Running Locally

```bash
git clone https://github.com/syedshahidashiqali/solutia-swes-reservation
cd solutia-swes-reservation
pnpm install
pnpm dev
```

---

## 📬 Contact

Syed Shahid Ali – [LinkedIn](https://www.linkedin.com/in/syed-shahid-ali-ssa)

---

> Assessment completed as per Solutia recruitment guidelines. No real backend or mock servers implemented; only simulated client-side logic and interaction.
