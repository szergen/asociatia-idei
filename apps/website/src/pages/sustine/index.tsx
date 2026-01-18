import React, { useState } from "react";
import { Check, Heart, CreditCard, User, Building2, ArrowRight } from "lucide-react";
import Head from "next/head";

type DonorType = "fizica" | "juridica";

interface FormData {
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  cnp?: string;
  adresa?: string;
  // Juridica fields
  companie?: string;
  cui?: string;
  reg_com?: string;
  banca?: string;
  iban?: string;
  sediu_social?: string;
  reprezentant?: string;
}

export default function SustinePage() {
  const [frequency, setFrequency] = useState<"monthly" | "one-time">("monthly");
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);
  const [donorType, setDonorType] = useState<DonorType>("fizica");
  const [formData, setFormData] = useState<FormData>({
    nume: "",
    prenume: "",
    email: "",
    telefon: "",
  });

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    if (e.target.value) {
      setAmount(Number(e.target.value));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", {
      frequency,
      amount,
      donorType,
      formData,
    });
    alert("Mulțumim pentru intenția de donație! (Mod dummy - datele au fost preluate)");
  };

  const predefinedAmounts = {
    monthly: [20, 35, 50, 100],
    "one-time": [50, 100, 200, 500],
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans">
      <Head>
        <title>Susține Asociația IDEI - Donează pentru educație</title>
        <meta
          name="description"
          content="Contribuie la proiectele Asociației IDEI. Donația ta ajută la crearea unui viitor mai bun prin educație și implicare civică."
        />
      </Head>

      {/* Hero Section with Background */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Left Column: Content */}
            <div className="md:col-span-7 space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Susține <span className="text-[#D32F2F]">Asociația IDEI</span>.
                <br />
                Investește în educație și viitor.
              </h1>
              
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  Pentru a continua să dezvoltăm proiecte educaționale și să avem
                  un impact real în comunitate, avem nevoie de sprijinul tău.
                  Independența noastră financiară ne permite să ne concentrăm pe
                  ceea ce contează cu adevărat: oamenii și nevoile lor.
                </p>
                <p>
                  Fiecare donație, oricât de mică, contribuie la materialele
                  necesare atelierelor, la organizarea evenimentelor și la
                  menținerea platformelor noastre digitale.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-bold text-gray-900">
                  De ce să donezi?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Susții educația non-formală în rândul tinerilor",
                    "Ajuți la digitalizarea resurselor educaționale",
                    "Contribui la organizarea de evenimente comunitare",
                    "Asiguri continuitatea proiectelor noastre",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1 mr-3">
                        <Check className="w-4 h-4 text-[#D32F2F]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Donation Widget */}
            <div className="md:col-span-5 relative">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-24">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {step === 1 ? "Alege cum vrei să contribui" : "Completează datele"}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">
                    Plată securizată prin Stripe
                  </p>
                </div>

                {step === 1 ? (
                  <>
                    {/* Frequency Tabs */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
                      <button
                        onClick={() => setFrequency("monthly")}
                        className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                          frequency === "monthly"
                            ? "bg-white text-[#D32F2F] shadow-sm"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        Lunar
                      </button>
                      <button
                        onClick={() => setFrequency("one-time")}
                        className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                          frequency === "one-time"
                            ? "bg-white text-[#D32F2F] shadow-sm"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        O singură dată
                      </button>
                    </div>

                    {/* Amount Buttons */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {predefinedAmounts[frequency].map((val) => (
                        <button
                          key={val}
                          onClick={() => {
                            setAmount(val);
                            setCustomAmount("");
                          }}
                          className={`py-4 px-4 rounded-lg border-2 text-lg font-bold transition-all duration-200 ${
                            amount === val && !customAmount
                              ? "border-[#D32F2F] bg-red-50 text-[#D32F2F]"
                              : "border-gray-200 text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {val} LEI
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="mb-8">
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Altă sumă"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className={`w-full py-3 px-4 pl-8 rounded-lg border-2 outline-none transition-all duration-200 ${
                            customAmount
                              ? "border-[#D32F2F] text-[#D32F2F] bg-red-50"
                              : "border-gray-200 focus:border-gray-300"
                          }`}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                          LEI
                        </span>
                      </div>
                    </div>

                    {/* Next Step Button */}
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white py-4 px-6 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center group"
                    >
                      Continuă
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Donor Type Switch */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                      <button
                        type="button"
                        onClick={() => setDonorType("fizica")}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold flex items-center justify-center space-x-2 transition-all duration-200 ${
                          donorType === "fizica"
                            ? "bg-white text-[#D32F2F] shadow-sm"
                            : "text-gray-600"
                        }`}
                      >
                        <User className="w-4 h-4" />
                        <span>Persoană fizică</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonorType("juridica")}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold flex items-center justify-center space-x-2 transition-all duration-200 ${
                          donorType === "juridica"
                            ? "bg-white text-[#D32F2F] shadow-sm"
                            : "text-gray-600"
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Persoană juridică</span>
                      </button>
                    </div>

                    {/* Personal / Company Details */}
                    {donorType === "fizica" ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Nume</label>
                            <input
                              type="text"
                              name="nume"
                              required
                              value={formData.nume}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Prenume</label>
                            <input
                              type="text"
                              name="prenume"
                              required
                              value={formData.prenume}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Telefon</label>
                          <input
                            type="tel"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                          />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-gray-600 mb-1">CNP (pentru contract)</label>
                           <input
                             type="text"
                             name="cnp"
                             value={formData.cnp}
                             onChange={handleInputChange}
                             placeholder="Opțional"
                             className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-gray-600 mb-1">Adresă completă</label>
                           <input
                             type="text"
                             name="adresa"
                             value={formData.adresa}
                             onChange={handleInputChange}
                             placeholder="Strada, Nr, Bloc, Ap, Oraș, Județ"
                             className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                           />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                           <label className="block text-xs font-semibold text-gray-600 mb-1">Denumire Companie</label>
                           <input
                             type="text"
                             name="companie"
                             required
                             value={formData.companie}
                             onChange={handleInputChange}
                             className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                             <label className="block text-xs font-semibold text-gray-600 mb-1">CUI</label>
                             <input
                               type="text"
                               name="cui"
                               required
                               value={formData.cui}
                               onChange={handleInputChange}
                               className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                             />
                           </div>
                           <div>
                             <label className="block text-xs font-semibold text-gray-600 mb-1">Nr. Reg. Com.</label>
                             <input
                               type="text"
                               name="reg_com"
                               required
                               value={formData.reg_com}
                               onChange={handleInputChange}
                               className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                             />
                           </div>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-gray-600 mb-1">Sediu Social</label>
                           <input
                             type="text"
                             name="sediu_social"
                             required
                             value={formData.sediu_social}
                             onChange={handleInputChange}
                             className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                           />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                          />
                        </div>
                         <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Telefon</label>
                          <input
                            type="tel"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Banca</label>
                            <input
                              type="text"
                              name="banca"
                              value={formData.banca}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">IBAN</label>
                            <input
                              type="text"
                              name="iban"
                              value={formData.iban}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                            />
                          </div>
                        </div>
                         <div>
                           <label className="block text-xs font-semibold text-gray-600 mb-1">Reprezentant Legal</label>
                           <input
                             type="text"
                             name="reprezentant"
                             required
                             value={formData.reprezentant}
                             onChange={handleInputChange}
                             className="w-full px-3 py-2 border rounded-lg focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition-colors"
                           />
                        </div>
                      </>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Înapoi
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#D32F2F] hover:bg-[#B71C1C] text-white py-3 px-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Heart className="w-5 h-5" />
                        <span>Donează {amount} LEI</span>
                      </button>
                    </div>
                  </form>
                )}

                <div className="mt-6 flex items-center justify-center space-x-4 text-gray-400 grayscale opacity-70">
                  <div className="flex items-center space-x-1">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-semibold">Card</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-[#F9F9F9] py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Unde merg banii tăi?
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Transparența este esențială pentru noi. Toate fondurile strânse sunt
            redirecționate către proiectele asociației.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Educație</h3>
              <p className="text-sm text-gray-500">
                Dezvoltarea de materiale și platforme educaționale moderne.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Comunitate</h3>
              <p className="text-sm text-gray-500">
                Evenimente și ateliere pentru tineri și profesioniști.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dezvoltare</h3>
              <p className="text-sm text-gray-500">
                Resurse pentru creșterea capacității asociației.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
