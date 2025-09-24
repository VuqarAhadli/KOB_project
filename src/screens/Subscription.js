import { CreditCard, Building } from "lucide-react";

const Subscription = ({ onNavigate }) => (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Premium Paketlər</h1>
        <button
          onClick={() => onNavigate("dashboard")}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          ← Geri
        </button>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Biznesiniz üçün uyğun planı seçin
        </h2>
        <p className="text-xl text-gray-600">
          Güclü maliyyə idarəetmə alətləri ilə KOB-unuzu böyüdün
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Freemium Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Freemium</h3>
            <div className="text-4xl font-bold text-gray-900 mb-1">Pulsuz</div>
            <p className="text-gray-600">Əsas funksiyalar</p>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
              <span className="text-gray-700">Əsas dashboard və qrafiklər</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
              <span className="text-gray-700">Ödəniş xatırlatmaları</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
              <span className="text-gray-700">Əsas maliyyə hesabatları</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              </div>
              <span className="text-gray-400">AI tövsiyələr</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              </div>
              <span className="text-gray-400">Pul axını simulyatoru</span>
            </li>
          </ul>

          <button className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            Hazırda aktiv
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
            Populyar
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <div className="text-4xl font-bold mb-1">29 ₼</div>
            <p className="text-blue-100">aylıq</p>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
              <span>Bütün Freemium funksiyalar</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
              <span>AI maliyyə tövsiyəçisi</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
              <span>Pul axını simulyatoru</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
              <span>Detallı proqnozlar</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
              <span>Prioritet dəstək</span>
            </li>
          </ul>

          <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Premium-a keç
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-12 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Ödəniş üsulları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center space-x-3">
            <CreditCard className="w-6 h-6 text-blue-500" />
            <div>
              <h4 className="font-semibold text-gray-900">Bank kartı</h4>
              <p className="text-sm text-gray-600">Visa, MasterCard</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center space-x-3">
            <Building className="w-6 h-6 text-green-500" />
            <div>
              <h4 className="font-semibold text-gray-900">Bank köçürməsi</h4>
              <p className="text-sm text-gray-600">SWIFT, lokal köçürmə</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Subscription;
