import { useMemo, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  addCoupon,
  deleteCoupon,
  getStoredCoupons,
  normalizeCouponCode,
  syncCouponsToFirestore,
  updateCoupon,
} from "../../utils/coupons";

const emptyForm = {
  code: "",
  label: "",
  type: "percent",
  value: "10",
  minSubtotal: "0",
  active: true,
  description: "",
};

const Coupons = () => {
  const { darkMode } = useContext(ThemeContext);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [coupons, setCoupons] = useState(() => getStoredCoupons());
  const [search, setSearch] = useState("");

  const sortedCoupons = useMemo(
    () => [...coupons].sort((a, b) => a.code.localeCompare(b.code)),
    [coupons]
  );

  const filteredCoupons = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return sortedCoupons;
    }

    return sortedCoupons.filter((coupon) =>
      `${coupon.code} ${coupon.label} ${coupon.description}`.toLowerCase().includes(query)
    );
  }, [search, sortedCoupons]);

  const activeCoupons = sortedCoupons.filter((coupon) => coupon.active).length;
  const inactiveCoupons = sortedCoupons.length - activeCoupons;

  const refreshCoupons = (nextCoupons) => {
    setCoupons(nextCoupons);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const code = normalizeCouponCode(form.code);

    if (!code || !form.label.trim()) {
      return;
    }

    setSaving(true);

    try {
      const nextCoupons = addCoupon({
        code,
        label: form.label,
        type: form.type,
        value: form.value,
        minSubtotal: form.minSubtotal,
        active: form.active,
        description: form.description,
      });

      refreshCoupons(nextCoupons);
      await syncCouponsToFirestore(nextCoupons);
      setForm(emptyForm);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (couponCode) => {
    setSaving(true);

    try {
      const nextCoupons = updateCoupon(couponCode, {
        active: !sortedCoupons.find((coupon) => coupon.code === couponCode)?.active,
      });

      refreshCoupons(nextCoupons);
      await syncCouponsToFirestore(nextCoupons);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (couponCode) => {
    setSaving(true);

    try {
      const nextCoupons = deleteCoupon(couponCode);
      refreshCoupons(nextCoupons);
      await syncCouponsToFirestore(nextCoupons);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={darkMode ? "text-white" : "text-black"}>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
          Promotions
        </p>

        <h1 className="mt-4 text-4xl font-bold">Coupons</h1>

        <p className={`mt-3 max-w-2xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Create coupon codes, activate or deactivate them, and keep checkout using the same shared coupon source.
        </p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className={`rounded-2xl border p-4 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total coupons</p>
          <p className="mt-2 text-2xl font-bold">{sortedCoupons.length}</p>
        </div>

        <div className={`rounded-2xl border p-4 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Active</p>
          <p className="mt-2 text-2xl font-bold text-green-600">{activeCoupons}</p>
        </div>

        <div className={`rounded-2xl border p-4 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Inactive</p>
          <p className="mt-2 text-2xl font-bold text-gray-500">{inactiveCoupons}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <h2 className="text-2xl font-bold">Add coupon</h2>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Code</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(event) => setForm({ ...form, code: event.target.value })}
                  placeholder="SAVE10"
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-green-500 ${darkMode ? "border-gray-700 bg-gray-950 text-white" : "border-gray-300 bg-white text-black"}`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Label</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(event) => setForm({ ...form, label: event.target.value })}
                  placeholder="10% off"
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-green-500 ${darkMode ? "border-gray-700 bg-gray-950 text-white" : "border-gray-300 bg-white text-black"}`}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Type</label>
                <select
                  value={form.type}
                  onChange={(event) => setForm({ ...form, type: event.target.value })}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-green-500 ${darkMode ? "border-gray-700 bg-gray-950 text-white" : "border-gray-300 bg-white text-black"}`}
                >
                  <option value="percent">Percent</option>
                  <option value="fixed">Fixed amount</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Value</label>
                <input
                  type="number"
                  min="1"
                  value={form.value}
                  onChange={(event) => setForm({ ...form, value: event.target.value })}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-green-500 ${darkMode ? "border-gray-700 bg-gray-950 text-white" : "border-gray-300 bg-white text-black"}`}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Min subtotal</label>
                <input
                  type="number"
                  min="0"
                  value={form.minSubtotal}
                  onChange={(event) => setForm({ ...form, minSubtotal: event.target.value })}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-green-500 ${darkMode ? "border-gray-700 bg-gray-950 text-white" : "border-gray-300 bg-white text-black"}`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Status</label>
                <select
                  value={form.active ? "active" : "inactive"}
                  onChange={(event) => setForm({ ...form, active: event.target.value === "active" })}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-green-500 ${darkMode ? "border-gray-700 bg-gray-950 text-white" : "border-gray-300 bg-white text-black"}`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Description</label>
              <textarea
                rows="3"
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-green-500 ${darkMode ? "border-gray-700 bg-gray-950 text-white" : "border-gray-300 bg-white text-black"}`}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Add coupon"}
            </button>
          </form>
        </div>

        <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Existing coupons</h2>
              <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Search, activate, and manage promotions quickly.
              </p>
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search coupons"
              className={`w-full rounded-2xl border px-4 py-3 outline-none md:max-w-xs ${darkMode ? "border-gray-700 bg-gray-950 text-white" : "border-gray-300 bg-white text-black"}`}
            />
          </div>

          <div className="mt-6 space-y-4">
            {filteredCoupons.length === 0 ? (
              <div className={`rounded-2xl border border-dashed p-6 text-center ${darkMode ? "border-gray-800 bg-gray-950/40" : "border-gray-200 bg-gray-50"}`}>
                <p className="font-semibold">No coupons match your search.</p>
                <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Try another keyword or create a new coupon.
                </p>
              </div>
            ) : filteredCoupons.map((coupon) => (
              <div
                key={coupon.code}
                className={`rounded-2xl border p-4 ${darkMode ? "border-gray-800 bg-gray-950/40" : "border-gray-200 bg-gray-50"}`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold">{coupon.code}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${coupon.active ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-500"}`}>
                        {coupon.active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {coupon.label} · {coupon.type === "percent" ? `${coupon.value}%` : `$${Number(coupon.value).toFixed(2)}`} off
                    </p>

                    <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Min subtotal: ${Number(coupon.minSubtotal || 0).toFixed(2)}
                    </p>

                    {coupon.description && (
                      <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {coupon.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggle(coupon.code)}
                      disabled={saving}
                      className="rounded-full border border-green-600 px-4 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {coupon.active ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(coupon.code)}
                      disabled={saving}
                      className="rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coupons;