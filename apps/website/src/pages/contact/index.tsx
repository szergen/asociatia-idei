import React, { useRef, useState } from "react";
import Joi from "joi";
import emailjs from "@emailjs/browser";
import { Pin, Send } from "lucide-react";

const schema = Joi.object({
  from_first_name: Joi.string().required().messages({
    "string.empty": "Prenumele este obligatoriu",
  }),
  from_last_name: Joi.string().required().messages({
    "string.empty": "Numele este obligatoriu",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Adresa de email este obligatorie",
      "string.email": "Adresa de email nu este validă",
    }),
  message: Joi.string().required().messages({
    "string.empty": "Mesajul este obligatoriu",
  }),
});

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    from_first_name: "",
    from_last_name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateProperty = (name: string, value: string) => {
    const obj = { [name]: value };
    const subSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = subSchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateProperty(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (form.current) {
        await emailjs.sendForm(
          "service_hnqz52d",
          "contact_form",
          form.current,
          "eMC5J00XgHPI0IgWK"
        );
        setNotification({
          type: "success",
          message:
            "Mesajul a fost trimis! Vă vom contacta în cel mai scurt timp.",
        });
        setFormData({
          from_first_name: "",
          from_last_name: "",
          email: "",
          message: "",
        });
        setErrors({});
      }
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message:
          "A apărut o eroare la trimiterea mesajului. Vă rugăm să ne contactați direct prin email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-[#444E72] overflow-hidden">
        <img
          src="/img/contact/bucharest.jpg"
          alt="Contact"
          className="w-full h-full object-cover opacity-40"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            Contact
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Info Card */}
          <div className="bg-white rounded-lg shadow-xl p-8 h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contactează-ne
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Salut! Dacă vrei să afli mai multe despre ceea ce facem sau chiar
              să ni te alături ca partener sau susținător, ne-ar plăcea să te
              auzim! Echipa noastră este mereu gata și dornică să discute.
              Completează formularul de contact și îți vom răspunde în cel mai
              scurt timp. Suntem dedicați creării unui impact pozitiv și lucrăm
              cu oameni care gândesc la fel pentru a aduce schimbarea și a face
              lumea un loc mai bun. Hai să facem lucrurile să se întâmple!
            </p>

            <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-lg">
              <Pin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Ne găsiți în
                </h3>
                <p className="text-gray-600">București, România</p>
              </div>
            </div>
            
             <div className="mt-8 text-gray-600">
               <p>
                 Sau ne puteți scrie direct la:{" "}
                 <a
                   href="mailto:raluca@asociatia-idei.eu"
                   className="text-blue-600 hover:underline font-medium"
                 >
                   raluca@asociatia-idei.eu
                 </a>
               </p>
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Scrie-ne un mesaj
            </h2>
            
            {notification && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  notification.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {notification.message}
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="from_last_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nume *
                  </label>
                  <input
                    type="text"
                    id="from_last_name"
                    name="from_last_name"
                    value={formData.from_last_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.from_last_name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Popescu"
                  />
                  {errors.from_last_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.from_last_name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="from_first_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Prenume *
                  </label>
                  <input
                    type="text"
                    id="from_first_name"
                    name="from_first_name"
                    value={formData.from_first_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.from_first_name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Ion"
                  />
                  {errors.from_first_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.from_first_name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Adresă de Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="ion.popescu@exemplu.ro"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mesaj *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.message
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Scrie mesajul tău aici..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>{isSubmitting ? "Se trimite..." : "Trimite Mesaj"}</span>
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
