import { useState, useEffect, useCallback } from "react";

// ============================================================
// PLAN ÚNICO DE CUENTAS (PUC) - COLOMBIA
// ============================================================
const PUC = {
  "1": {
    nombre: "ACTIVO",
    tipo: "activo",
    subcuentas: {
      "11": { nombre: "Disponible", subcuentas: { "1105": "Caja General", "1110": "Bancos", "1115": "Remesas en tránsito", "1120": "Cuentas de ahorro" } },
      "12": { nombre: "Inversiones", subcuentas: { "1205": "Acciones", "1210": "Cuotas o partes de interés social", "1225": "CDT", "1230": "Bonos" } },
      "13": { nombre: "Deudores", subcuentas: { "1305": "Clientes", "1310": "Cuentas corrientes comerciales", "1320": "Deudores varios", "1330": "Anticipos y avances", "1355": "Anticipo de impuestos y contrib." } },
      "14": { nombre: "Inventarios", subcuentas: { "1405": "Materias primas", "1410": "Productos en proceso", "1430": "Productos terminados", "1435": "Mercancías no fabricadas" } },
      "15": { nombre: "Propiedades, Planta y Equipo", subcuentas: { "1504": "Terrenos", "1508": "Construcciones y edificaciones", "1516": "Maquinaria y equipo", "1520": "Equipo de oficina", "1524": "Equipo de computación", "1528": "Equipo de comunicación" } },
      "16": { nombre: "Intangibles", subcuentas: { "1605": "Crédito mercantil", "1610": "Marcas", "1615": "Patentes", "1625": "Licencias" } },
      "17": { nombre: "Diferidos", subcuentas: { "1705": "Gastos pagados por anticipado", "1710": "Cargos diferidos" } },
    }
  },
  "2": {
    nombre: "PASIVO",
    tipo: "pasivo",
    subcuentas: {
      "21": { nombre: "Obligaciones Financieras", subcuentas: { "2105": "Bancos nacionales", "2110": "Bancos del exterior", "2115": "Corporaciones financieras", "2135": "Obligaciones leasing" } },
      "22": { nombre: "Proveedores", subcuentas: { "2205": "Proveedores nacionales", "2210": "Proveedores del exterior" } },
      "23": { nombre: "Cuentas por Pagar", subcuentas: { "2305": "Compañías vinculadas", "2315": "A contratistas", "2320": "A empleados", "2335": "Costos y gastos por pagar", "2360": "Dividendos por pagar" } },
      "24": { nombre: "Impuestos, Gravámenes y Tasas", subcuentas: { "2404": "IVA por pagar", "2408": "Retención en la fuente", "2412": "Retenciones ICA", "2416": "Impuesto de renta y complementarios" } },
      "25": { nombre: "Obligaciones Laborales", subcuentas: { "2505": "Salarios por pagar", "2510": "Cesantías consolidadas", "2515": "Intereses sobre cesantías", "2520": "Prima de servicios", "2525": "Vacaciones consolidadas", "2530": "Prestaciones extralegales" } },
      "26": { nombre: "Pasivos Estimados y Provisiones", subcuentas: { "2605": "Para costos y gastos", "2610": "Para obligaciones fiscales", "2615": "Para prestaciones sociales" } },
      "29": { nombre: "Otros Pasivos", subcuentas: { "2905": "Ingresos recibidos por anticipado", "2910": "Depósitos recibidos" } },
    }
  },
  "3": {
    nombre: "PATRIMONIO",
    tipo: "patrimonio",
    subcuentas: {
      "31": { nombre: "Capital Social", subcuentas: { "3105": "Capital suscrito y pagado", "3110": "Aportes sociales" } },
      "32": { nombre: "Superávit de Capital", subcuentas: { "3205": "Prima en colocación de acciones", "3210": "Donaciones" } },
      "33": { nombre: "Reservas", subcuentas: { "3305": "Reserva legal", "3310": "Reservas estatutarias", "3315": "Reservas ocasionales" } },
      "34": { nombre: "Revalorización del Patrimonio", subcuentas: { "3405": "Revalorización del patrimonio" } },
      "36": { nombre: "Resultados del Ejercicio", subcuentas: { "3605": "Utilidad del ejercicio", "3610": "Pérdida del ejercicio" } },
      "37": { nombre: "Resultados de Ejercicios Anteriores", subcuentas: { "3705": "Utilidades acumuladas", "3710": "Pérdidas acumuladas" } },
    }
  },
  "4": {
    nombre: "INGRESOS",
    tipo: "ingreso",
    subcuentas: {
      "41": { nombre: "Operacionales", subcuentas: { "4105": "Comercio al por mayor y menor", "4110": "Industria manufacturera", "4115": "Servicios", "4120": "Honorarios", "4125": "Comisiones", "4130": "Intereses" } },
      "42": { nombre: "No Operacionales", subcuentas: { "4205": "Financieros", "4210": "Dividendos", "4215": "Arrendamientos", "4220": "Utilidad en venta de inv.", "4225": "Recuperaciones", "4295": "Otros" } },
    }
  },
  "5": {
    nombre: "GASTOS",
    tipo: "gasto",
    subcuentas: {
      "51": { nombre: "Operacionales de Administración", subcuentas: { "5105": "Gastos de personal", "5110": "Honorarios", "5115": "Impuestos", "5120": "Arrendamientos", "5125": "Contribuciones y afiliaciones", "5130": "Seguros", "5135": "Servicios", "5140": "Gastos legales", "5145": "Mantenimiento y reparaciones", "5150": "Adecuación e instalación", "5155": "Gastos de viaje", "5160": "Depreciaciones", "5165": "Amortizaciones", "5195": "Diversos" } },
      "52": { nombre: "Operacionales de Ventas", subcuentas: { "5205": "Gastos de personal", "5210": "Honorarios", "5215": "Impuestos", "5235": "Servicios", "5245": "Mantenimiento", "5255": "Gastos de viaje", "5260": "Depreciaciones", "5295": "Diversos" } },
      "53": { nombre: "No Operacionales", subcuentas: { "5305": "Financieros", "5310": "Pérdida en venta de inversiones", "5315": "Gastos extraordinarios", "5395": "Otros" } },
    }
  },
  "6": {
    nombre: "COSTOS DE VENTAS",
    tipo: "costo",
    subcuentas: {
      "61": { nombre: "Costo de Ventas y de Prestación de Servicios", subcuentas: { "6105": "De mercancías vendidas", "6110": "De productos terminados", "6115": "De materias primas", "6120": "De servicios prestados" } },
    }
  },
  "7": {
    nombre: "COSTOS DE PRODUCCIÓN",
    tipo: "costo",
    subcuentas: {
      "71": { nombre: "Materia Prima", subcuentas: { "7105": "Materias primas", "7110": "Materiales" } },
      "72": { nombre: "Mano de Obra Directa", subcuentas: { "7205": "Sueldos y salarios", "7210": "Horas extras" } },
      "73": { nombre: "Costos Indirectos", subcuentas: { "7305": "Materiales indirectos", "7310": "Mano de obra indirecta", "7315": "Depreciaciones", "7395": "Otros" } },
    }
  }
};

// Flatten PUC for quick lookup
const flatCuentas = {};
Object.entries(PUC).forEach(([clase, claseData]) => {
  flatCuentas[clase] = { codigo: clase, nombre: claseData.nombre, tipo: claseData.tipo };
  Object.entries(claseData.subcuentas).forEach(([grupo, grupoData]) => {
    flatCuentas[grupo] = { codigo: grupo, nombre: grupoData.nombre, tipo: claseData.tipo };
    Object.entries(grupoData.subcuentas).forEach(([cuenta, nombre]) => {
      flatCuentas[cuenta] = { codigo: cuenta, nombre, tipo: claseData.tipo };
    });
  });
});

// Storage helpers
const STORAGE_KEY = "contabilidad_col_v1";
const loadData = async () => {
  try {
    const r = await window.storage.get(STORAGE_KEY);
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
};
const saveData = async (data) => {
  try { await window.storage.set(STORAGE_KEY, JSON.stringify(data)); } catch {}
};

const initData = () => ({
  empresa: "Mi Empresa SAS",
  asientos: [],
  nextId: 1,
});

// ============================================================
// UTILITIES
// ============================================================
const fmt = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
const fmtDate = (d) => new Date(d).toLocaleDateString("es-CO");

function calcBalance(asientos) {
  const saldos = {};
  asientos.forEach(a => {
    a.partidas.forEach(p => {
      if (!saldos[p.cuenta]) saldos[p.cuenta] = { debito: 0, credito: 0 };
      saldos[p.cuenta].debito += p.debito || 0;
      saldos[p.cuenta].credito += p.credito || 0;
    });
  });
  return saldos;
}

function calcEstados(saldos) {
  const result = { activos: 0, pasivos: 0, patrimonio: 0, ingresos: 0, gastos: 0, costos: 0 };
  Object.entries(saldos).forEach(([cod, { debito, credito }]) => {
    const info = flatCuentas[cod];
    if (!info) return;
    const neto = debito - credito;
    if (info.tipo === "activo") result.activos += neto;
    if (info.tipo === "pasivo") result.pasivos += Math.abs(neto);
    if (info.tipo === "patrimonio") result.patrimonio += Math.abs(neto);
    if (info.tipo === "ingreso") result.ingresos += Math.abs(neto);
    if (info.tipo === "gasto") result.gastos += neto;
    if (info.tipo === "costo") result.costos += neto;
  });
  return result;
}

// ============================================================
// COMPONENTS
// ============================================================

function CuentaSelector({ value, onChange, placeholder = "Buscar cuenta..." }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const matches = search.length >= 2
    ? Object.entries(flatCuentas)
        .filter(([cod, { nombre }]) =>
          cod.includes(search) || nombre.toLowerCase().includes(search.toLowerCase())
        )
        .filter(([cod]) => cod.length >= 4)
        .slice(0, 10)
    : [];

  const selected = value ? flatCuentas[value] : null;

  return (
    <div style={{ position: "relative" }}>
      <input
        style={styles.input}
        placeholder={selected ? `${selected.codigo} - ${selected.nombre}` : placeholder}
        value={search}
        onChange={e => { setSearch(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && matches.length > 0 && (
        <div style={styles.dropdown}>
          {matches.map(([cod, { nombre, tipo }]) => (
            <div key={cod} style={styles.dropdownItem}
              onMouseDown={() => { onChange(cod); setSearch(""); setOpen(false); }}>
              <span style={{ ...styles.badge, background: TIPO_COLORS[tipo] }}>{cod}</span>
              <span style={{ fontSize: 13 }}>{nombre}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const TIPO_COLORS = {
  activo: "#1a7a4a", pasivo: "#c0392b", patrimonio: "#7d3c98",
  ingreso: "#1a5276", gasto: "#b7950b", costo: "#6e2f1a"
};

// ============================================================
// MAIN APP
// ============================================================
export default function ContabilidadColombia() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState("dashboard");
  const [asientoForm, setAsientoForm] = useState({
    fecha: new Date().toISOString().split("T")[0],
    concepto: "",
    partidas: [{ cuenta: "", descripcion: "", debito: "", credito: "" }]
  });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");

  useEffect(() => {
    loadData().then(d => {
      setData(d || initData());
      setLoading(false);
    });
  }, []);

  const persist = useCallback(async (newData) => {
    setData(newData);
    await saveData(newData);
  }, []);

  if (loading) return <div style={styles.loadingScreen}><div style={styles.spinner} /></div>;

  const saldos = calcBalance(data.asientos);
  const estados = calcEstados(saldos);
  const utilidad = estados.ingresos - estados.gastos - estados.costos;

  // Flujo de caja simplificado
  const flujoEntradas = data.asientos
    .flatMap(a => a.partidas.filter(p => flatCuentas[p.cuenta]?.tipo === "ingreso").map(p => ({ ...p, fecha: a.fecha, concepto: a.concepto })))
    .reduce((s, p) => s + (p.credito || 0), 0);
  const flujoSalidas = data.asientos
    .flatMap(a => a.partidas.filter(p => ["gasto", "costo"].includes(flatCuentas[p.cuenta]?.tipo)).map(p => ({ ...p, fecha: a.fecha, concepto: a.concepto })))
    .reduce((s, p) => s + (p.debito || 0), 0);

  // Partidas form helpers
  const addPartida = () => setAsientoForm(f => ({ ...f, partidas: [...f.partidas, { cuenta: "", descripcion: "", debito: "", credito: "" }] }));
  const removePartida = (i) => setAsientoForm(f => ({ ...f, partidas: f.partidas.filter((_, idx) => idx !== i) }));
  const updatePartida = (i, field, val) => setAsientoForm(f => ({
    ...f, partidas: f.partidas.map((p, idx) => idx === i ? { ...p, [field]: val } : p)
  }));

  const totalDeb = asientoForm.partidas.reduce((s, p) => s + (parseFloat(p.debito) || 0), 0);
  const totalCred = asientoForm.partidas.reduce((s, p) => s + (parseFloat(p.credito) || 0), 0);
  const balanced = Math.abs(totalDeb - totalCred) < 0.01 && totalDeb > 0;

  const registrarAsiento = () => {
    setErrMsg("");
    if (!asientoForm.fecha) return setErrMsg("Ingrese la fecha.");
    if (!asientoForm.concepto.trim()) return setErrMsg("Ingrese el concepto.");
    if (asientoForm.partidas.some(p => !p.cuenta)) return setErrMsg("Todas las partidas deben tener cuenta.");
    if (!balanced) return setErrMsg(`La partida NO está balanceada. Diferencia: ${fmt(totalDeb - totalCred)}`);

    const nuevoAsiento = {
      id: data.nextId,
      fecha: asientoForm.fecha,
      concepto: asientoForm.concepto,
      partidas: asientoForm.partidas.map(p => ({
        cuenta: p.cuenta,
        descripcion: p.descripcion || flatCuentas[p.cuenta]?.nombre || "",
        debito: parseFloat(p.debito) || 0,
        credito: parseFloat(p.credito) || 0,
      }))
    };

    const newData = { ...data, nextId: data.nextId + 1, asientos: [...data.asientos, nuevoAsiento] };
    persist(newData);
    setAsientoForm({ fecha: new Date().toISOString().split("T")[0], concepto: "", partidas: [{ cuenta: "", descripcion: "", debito: "", credito: "" }] });
    setSuccess(`✓ Asiento #${nuevoAsiento.id} registrado correctamente`);
    setTimeout(() => setSuccess(""), 3000);
  };

  const eliminarAsiento = (id) => {
    if (!confirm("¿Eliminar este asiento contable?")) return;
    persist({ ...data, asientos: data.asientos.filter(a => a.id !== id) });
  };

  const asientosFiltrados = filterTipo === "todos"
    ? data.asientos
    : data.asientos.filter(a => a.partidas.some(p => flatCuentas[p.cuenta]?.tipo === filterTipo));

  const NAV = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "asiento", label: "✏️ Nuevo Asiento" },
    { id: "libro", label: "📒 Libro Diario" },
    { id: "balance", label: "⚖️ Balance General" },
    { id: "pyl", label: "💹 P&G" },
    { id: "flujo", label: "💧 Flujo de Caja" },
  ];

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>📘</div>
          <div>
            <div style={styles.logoTitle}>ContaCol</div>
            <div style={styles.logoSub}>Plan PUC Colombia</div>
          </div>
        </div>
        <div style={styles.empresaBox}>
          <input
            style={styles.empresaInput}
            value={data.empresa}
            onChange={e => persist({ ...data, empresa: e.target.value })}
          />
        </div>
        <nav style={styles.nav}>
          {NAV.map(n => (
            <button key={n.id} style={{ ...styles.navBtn, ...(vista === n.id ? styles.navBtnActive : {}) }}
              onClick={() => setVista(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>
        <div style={styles.sidebarFooter}>
          <div style={{ fontSize: 11, color: "#64748b" }}>Asientos registrados</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}>{data.asientos.length}</div>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* DASHBOARD */}
        {vista === "dashboard" && (
          <div>
            <h2 style={styles.pageTitle}>Dashboard Financiero</h2>
            <div style={styles.kpiGrid}>
              {[
                { label: "Total Activos", value: fmt(estados.activos), color: "#1a7a4a", icon: "🏦" },
                { label: "Total Pasivos", value: fmt(estados.pasivos), color: "#c0392b", icon: "💳" },
                { label: "Patrimonio", value: fmt(estados.patrimonio), color: "#7d3c98", icon: "🏛️" },
                { label: "Ingresos", value: fmt(estados.ingresos), color: "#1a5276", icon: "📈" },
                { label: "Gastos + Costos", value: fmt(estados.gastos + estados.costos), color: "#b7950b", icon: "📉" },
                { label: "Utilidad Neta", value: fmt(utilidad), color: utilidad >= 0 ? "#1a7a4a" : "#c0392b", icon: utilidad >= 0 ? "✅" : "❌" },
              ].map(k => (
                <div key={k.label} style={styles.kpiCard}>
                  <div style={styles.kpiIcon}>{k.icon}</div>
                  <div style={{ ...styles.kpiValue, color: k.color }}>{k.value}</div>
                  <div style={styles.kpiLabel}>{k.label}</div>
                </div>
              ))}
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Últimos Movimientos</h3>
              {data.asientos.length === 0
                ? <p style={styles.empty}>No hay asientos registrados. Comience registrando una operación.</p>
                : data.asientos.slice(-5).reverse().map(a => (
                  <div key={a.id} style={styles.movRow}>
                    <div style={styles.movBadge}>#{a.id}</div>
                    <div style={{ flex: 1 }}>
                      <div style={styles.movConcepto}>{a.concepto}</div>
                      <div style={styles.movFecha}>{fmtDate(a.fecha)}</div>
                    </div>
                    <div style={styles.movMonto}>{fmt(a.partidas.reduce((s, p) => s + p.debito, 0))}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* NUEVO ASIENTO */}
        {vista === "asiento" && (
          <div>
            <h2 style={styles.pageTitle}>Registro de Asiento Contable</h2>
            {errMsg && <div style={styles.errorBox}>{errMsg}</div>}
            {success && <div style={styles.successBox}>{success}</div>}
            <div style={styles.card}>
              <div style={styles.row2}>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Fecha</label>
                  <input type="date" style={styles.input} value={asientoForm.fecha}
                    onChange={e => setAsientoForm(f => ({ ...f, fecha: e.target.value }))} />
                </div>
                <div style={{ flex: 3 }}>
                  <label style={styles.label}>Concepto / Descripción</label>
                  <input style={styles.input} placeholder="Descripción de la operación..." value={asientoForm.concepto}
                    onChange={e => setAsientoForm(f => ({ ...f, concepto: e.target.value }))} />
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={styles.tableHeader}>
                  <span style={{ flex: 2.5 }}>Cuenta PUC</span>
                  <span style={{ flex: 2 }}>Descripción</span>
                  <span style={{ flex: 1.5, textAlign: "right" }}>Débito</span>
                  <span style={{ flex: 1.5, textAlign: "right" }}>Crédito</span>
                  <span style={{ width: 36 }}></span>
                </div>
                {asientoForm.partidas.map((p, i) => (
                  <div key={i} style={styles.partRow}>
                    <div style={{ flex: 2.5, paddingRight: 8 }}>
                      <CuentaSelector value={p.cuenta} onChange={v => updatePartida(i, "cuenta", v)} />
                    </div>
                    <div style={{ flex: 2, paddingRight: 8 }}>
                      <input style={styles.input} placeholder="Descripción..."
                        value={p.descripcion} onChange={e => updatePartida(i, "descripcion", e.target.value)} />
                    </div>
                    <div style={{ flex: 1.5, paddingRight: 8 }}>
                      <input type="number" style={{ ...styles.input, textAlign: "right" }} placeholder="0"
                        value={p.debito} onChange={e => updatePartida(i, "debito", e.target.value)} />
                    </div>
                    <div style={{ flex: 1.5, paddingRight: 8 }}>
                      <input type="number" style={{ ...styles.input, textAlign: "right" }} placeholder="0"
                        value={p.credito} onChange={e => updatePartida(i, "credito", e.target.value)} />
                    </div>
                    <button style={styles.removeBtn} onClick={() => removePartida(i)} disabled={asientoForm.partidas.length <= 1}>✕</button>
                  </div>
                ))}

                <div style={styles.totalesRow}>
                  <span style={{ flex: 4.5 }}></span>
                  <span style={{ flex: 1.5, textAlign: "right", fontWeight: 700, color: "#1e293b" }}>{fmt(totalDeb)}</span>
                  <span style={{ flex: 1.5, textAlign: "right", fontWeight: 700, color: "#1e293b", paddingRight: 8 }}>{fmt(totalCred)}</span>
                  <span style={{ width: 36 }}></span>
                </div>

                <div style={styles.balanceIndicator}>
                  <span style={{ color: balanced ? "#1a7a4a" : "#c0392b", fontWeight: 600 }}>
                    {balanced ? "✓ Partida balanceada" : `⚠ Diferencia: ${fmt(Math.abs(totalDeb - totalCred))}`}
                  </span>
                </div>
              </div>

              <div style={styles.actionRow}>
                <button style={styles.addBtn} onClick={addPartida}>+ Agregar Partida</button>
                <button style={{ ...styles.primaryBtn, opacity: balanced ? 1 : 0.5 }}
                  onClick={registrarAsiento} disabled={!balanced}>
                  💾 Registrar Asiento
                </button>
              </div>
            </div>

            {/* Plantillas rápidas */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Plantillas Rápidas</h3>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  {
                    label: "💰 Venta de Contado",
                    partidas: [{ cuenta: "1105", descripcion: "Ingreso en caja", debito: 0, credito: 0 }, { cuenta: "4105", descripcion: "Venta de mercancía", debito: 0, credito: 0 }]
                  },
                  {
                    label: "🛒 Compra de Mercancía",
                    partidas: [{ cuenta: "1435", descripcion: "Mercancía en inventario", debito: 0, credito: 0 }, { cuenta: "2205", descripcion: "A proveedor", debito: 0, credito: 0 }]
                  },
                  {
                    label: "👷 Pago de Nómina",
                    partidas: [{ cuenta: "5105", descripcion: "Gasto nómina", debito: 0, credito: 0 }, { cuenta: "1110", descripcion: "Banco", debito: 0, credito: 0 }]
                  },
                  {
                    label: "🏦 Préstamo Bancario",
                    partidas: [{ cuenta: "1110", descripcion: "Ingreso banco", debito: 0, credito: 0 }, { cuenta: "2105", descripcion: "Obligación financiera", debito: 0, credito: 0 }]
                  },
                ].map(t => (
                  <button key={t.label} style={styles.templateBtn}
                    onClick={() => { setAsientoForm(f => ({ ...f, partidas: t.partidas.map(p => ({ ...p, debito: "", credito: "" })) })); setVista("asiento"); }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LIBRO DIARIO */}
        {vista === "libro" && (
          <div>
            <h2 style={styles.pageTitle}>Libro Diario</h2>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              {["todos", "activo", "pasivo", "patrimonio", "ingreso", "gasto", "costo"].map(t => (
                <button key={t} style={{ ...styles.filterBtn, ...(filterTipo === t ? styles.filterBtnActive : {}) }}
                  onClick={() => setFilterTipo(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            {asientosFiltrados.length === 0
              ? <p style={styles.empty}>No hay asientos registrados.</p>
              : asientosFiltrados.map(a => (
                <div key={a.id} style={styles.asientoCard}>
                  <div style={styles.asientoHeader}>
                    <span style={styles.asientoNum}>Asiento #{a.id}</span>
                    <span style={styles.asientoFecha}>{fmtDate(a.fecha)}</span>
                    <span style={styles.asientoConcepto}>{a.concepto}</span>
                    <button style={styles.deleteBtn} onClick={() => eliminarAsiento(a.id)}>🗑</button>
                  </div>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Código</th>
                        <th style={styles.th}>Cuenta</th>
                        <th style={styles.th}>Descripción</th>
                        <th style={{ ...styles.th, textAlign: "right" }}>Débito</th>
                        <th style={{ ...styles.th, textAlign: "right" }}>Crédito</th>
                      </tr>
                    </thead>
                    <tbody>
                      {a.partidas.map((p, i) => (
                        <tr key={i}>
                          <td style={styles.td}>
                            <span style={{ ...styles.badge, background: TIPO_COLORS[flatCuentas[p.cuenta]?.tipo] }}>{p.cuenta}</span>
                          </td>
                          <td style={styles.td}>{flatCuentas[p.cuenta]?.nombre}</td>
                          <td style={styles.td}>{p.descripcion}</td>
                          <td style={{ ...styles.td, textAlign: "right", fontFamily: "monospace" }}>{p.debito ? fmt(p.debito) : ""}</td>
                          <td style={{ ...styles.td, textAlign: "right", fontFamily: "monospace" }}>{p.credito ? fmt(p.credito) : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        )}

        {/* BALANCE GENERAL */}
        {vista === "balance" && (
          <div>
            <h2 style={styles.pageTitle}>Balance General</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* ACTIVOS */}
              <div style={styles.card}>
                <h3 style={{ ...styles.cardTitle, color: "#1a7a4a" }}>ACTIVOS</h3>
                {Object.entries(PUC["1"].subcuentas).map(([grupo, g]) => {
                  const total = Object.keys(g.subcuentas).reduce((s, c) => {
                    const sal = saldos[c];
                    return s + (sal ? sal.debito - sal.credito : 0);
                  }, 0);
                  if (!total) return null;
                  return (
                    <div key={grupo} style={styles.balRow}>
                      <span style={styles.balNombre}>{g.nombre}</span>
                      <span style={{ ...styles.balMonto, color: "#1a7a4a" }}>{fmt(total)}</span>
                    </div>
                  );
                })}
                <div style={styles.balTotal}>
                  <span>TOTAL ACTIVOS</span>
                  <span>{fmt(estados.activos)}</span>
                </div>
              </div>
              {/* PASIVOS + PATRIMONIO */}
              <div>
                <div style={styles.card}>
                  <h3 style={{ ...styles.cardTitle, color: "#c0392b" }}>PASIVOS</h3>
                  {Object.entries(PUC["2"].subcuentas).map(([grupo, g]) => {
                    const total = Object.keys(g.subcuentas).reduce((s, c) => {
                      const sal = saldos[c];
                      return s + (sal ? sal.credito - sal.debito : 0);
                    }, 0);
                    if (!total) return null;
                    return (
                      <div key={grupo} style={styles.balRow}>
                        <span style={styles.balNombre}>{g.nombre}</span>
                        <span style={{ ...styles.balMonto, color: "#c0392b" }}>{fmt(total)}</span>
                      </div>
                    );
                  })}
                  <div style={styles.balTotal}><span>TOTAL PASIVOS</span><span>{fmt(estados.pasivos)}</span></div>
                </div>
                <div style={{ ...styles.card, marginTop: 0 }}>
                  <h3 style={{ ...styles.cardTitle, color: "#7d3c98" }}>PATRIMONIO</h3>
                  {Object.entries(PUC["3"].subcuentas).map(([grupo, g]) => {
                    const total = Object.keys(g.subcuentas).reduce((s, c) => {
                      const sal = saldos[c];
                      return s + (sal ? sal.credito - sal.debito : 0);
                    }, 0);
                    if (!total) return null;
                    return (
                      <div key={grupo} style={styles.balRow}>
                        <span style={styles.balNombre}>{g.nombre}</span>
                        <span style={{ ...styles.balMonto, color: "#7d3c98" }}>{fmt(total)}</span>
                      </div>
                    );
                  })}
                  <div style={styles.balRow}>
                    <span style={styles.balNombre}>Utilidad del Ejercicio</span>
                    <span style={{ ...styles.balMonto, color: utilidad >= 0 ? "#1a7a4a" : "#c0392b" }}>{fmt(utilidad)}</span>
                  </div>
                  <div style={styles.balTotal}><span>TOTAL PATRIMONIO</span><span>{fmt(estados.patrimonio + utilidad)}</span></div>
                </div>
              </div>
            </div>
            <div style={{ ...styles.card, background: "#f0fdf4", border: "2px solid #1a7a4a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                <span>⚖️ ECUACIÓN CONTABLE: Activos = Pasivos + Patrimonio</span>
                <span style={{ color: Math.abs(estados.activos - estados.pasivos - estados.patrimonio - utilidad) < 1 ? "#1a7a4a" : "#c0392b" }}>
                  {Math.abs(estados.activos - estados.pasivos - estados.patrimonio - utilidad) < 1 ? "✓ BALANCEADO" : "⚠ DIFERENCIA"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* P&G */}
        {vista === "pyl" && (
          <div>
            <h2 style={styles.pageTitle}>Estado de Pérdidas y Ganancias</h2>
            <div style={styles.card}>
              <div style={styles.pylSection}>
                <h3 style={{ color: "#1a5276", marginBottom: 10 }}>INGRESOS OPERACIONALES</h3>
                {Object.entries(PUC["4"].subcuentas).map(([grupo, g]) =>
                  Object.entries(g.subcuentas).map(([cod, nombre]) => {
                    const sal = saldos[cod];
                    const val = sal ? sal.credito - sal.debito : 0;
                    if (!val) return null;
                    return (
                      <div key={cod} style={styles.pylRow}>
                        <span>{nombre}</span>
                        <span style={{ color: "#1a5276", fontFamily: "monospace" }}>{fmt(val)}</span>
                      </div>
                    );
                  })
                )}
                <div style={{ ...styles.pylTotal, borderColor: "#1a5276", color: "#1a5276" }}>
                  <span>TOTAL INGRESOS</span><span>{fmt(estados.ingresos)}</span>
                </div>
              </div>

              <div style={styles.pylSection}>
                <h3 style={{ color: "#6e2f1a", marginBottom: 10 }}>COSTOS DE VENTAS</h3>
                {Object.entries(PUC["6"].subcuentas).map(([grupo, g]) =>
                  Object.entries(g.subcuentas).map(([cod, nombre]) => {
                    const sal = saldos[cod];
                    const val = sal ? sal.debito - sal.credito : 0;
                    if (!val) return null;
                    return (
                      <div key={cod} style={styles.pylRow}>
                        <span>{nombre}</span>
                        <span style={{ color: "#6e2f1a", fontFamily: "monospace" }}>{fmt(val)}</span>
                      </div>
                    );
                  })
                )}
                <div style={{ ...styles.pylTotal, borderColor: "#6e2f1a", color: "#6e2f1a" }}>
                  <span>TOTAL COSTOS</span><span>{fmt(estados.costos)}</span>
                </div>
              </div>

              <div style={{ ...styles.pylRow, fontWeight: 600, fontSize: 15, padding: "12px 0", borderBottom: "2px solid #e2e8f0" }}>
                <span>UTILIDAD BRUTA</span>
                <span style={{ color: estados.ingresos - estados.costos >= 0 ? "#1a7a4a" : "#c0392b" }}>{fmt(estados.ingresos - estados.costos)}</span>
              </div>

              <div style={styles.pylSection}>
                <h3 style={{ color: "#b7950b", marginBottom: 10 }}>GASTOS OPERACIONALES</h3>
                {Object.entries(PUC["5"].subcuentas).map(([grupo, g]) =>
                  Object.entries(g.subcuentas).map(([cod, nombre]) => {
                    const sal = saldos[cod];
                    const val = sal ? sal.debito - sal.credito : 0;
                    if (!val) return null;
                    return (
                      <div key={cod} style={styles.pylRow}>
                        <span>{nombre}</span>
                        <span style={{ color: "#b7950b", fontFamily: "monospace" }}>{fmt(val)}</span>
                      </div>
                    );
                  })
                )}
                <div style={{ ...styles.pylTotal, borderColor: "#b7950b", color: "#b7950b" }}>
                  <span>TOTAL GASTOS</span><span>{fmt(estados.gastos)}</span>
                </div>
              </div>

              <div style={{ padding: "20px", background: utilidad >= 0 ? "#f0fdf4" : "#fff5f5", borderRadius: 10, marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: utilidad >= 0 ? "#1a7a4a" : "#c0392b" }}>
                  <span>{utilidad >= 0 ? "✅ UTILIDAD NETA DEL EJERCICIO" : "❌ PÉRDIDA NETA DEL EJERCICIO"}</span>
                  <span>{fmt(Math.abs(utilidad))}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FLUJO DE CAJA */}
        {vista === "flujo" && (
          <div>
            <h2 style={styles.pageTitle}>Estado de Flujo de Caja</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
              {[
                { label: "Total Entradas", valor: fmt(flujoEntradas), color: "#1a7a4a", icon: "📥" },
                { label: "Total Salidas", valor: fmt(flujoSalidas), color: "#c0392b", icon: "📤" },
                { label: "Flujo Neto", valor: fmt(flujoEntradas - flujoSalidas), color: flujoEntradas >= flujoSalidas ? "#1a7a4a" : "#c0392b", icon: flujoEntradas >= flujoSalidas ? "💚" : "🔴" },
              ].map(k => (
                <div key={k.label} style={styles.kpiCard}>
                  <div style={styles.kpiIcon}>{k.icon}</div>
                  <div style={{ ...styles.kpiValue, color: k.color }}>{k.valor}</div>
                  <div style={styles.kpiLabel}>{k.label}</div>
                </div>
              ))}
            </div>

            <div style={styles.card}>
              <h3 style={{ ...styles.cardTitle, color: "#1a7a4a" }}>📥 Entradas de Efectivo (Ingresos)</h3>
              {data.asientos.length === 0
                ? <p style={styles.empty}>Sin movimientos registrados.</p>
                : data.asientos.map(a =>
                  a.partidas
                    .filter(p => flatCuentas[p.cuenta]?.tipo === "ingreso" && p.credito > 0)
                    .map((p, i) => (
                      <div key={`${a.id}-${i}`} style={styles.flujoRow}>
                        <span style={styles.flujoDate}>{fmtDate(a.fecha)}</span>
                        <span style={styles.flujoDesc}>{a.concepto} - {flatCuentas[p.cuenta]?.nombre}</span>
                        <span style={{ ...styles.flujoMonto, color: "#1a7a4a" }}>+{fmt(p.credito)}</span>
                      </div>
                    ))
                )}
            </div>

            <div style={styles.card}>
              <h3 style={{ ...styles.cardTitle, color: "#c0392b" }}>📤 Salidas de Efectivo (Gastos/Costos)</h3>
              {data.asientos.length === 0
                ? <p style={styles.empty}>Sin movimientos registrados.</p>
                : data.asientos.map(a =>
                  a.partidas
                    .filter(p => ["gasto", "costo"].includes(flatCuentas[p.cuenta]?.tipo) && p.debito > 0)
                    .map((p, i) => (
                      <div key={`${a.id}-${i}`} style={styles.flujoRow}>
                        <span style={styles.flujoDate}>{fmtDate(a.fecha)}</span>
                        <span style={styles.flujoDesc}>{a.concepto} - {flatCuentas[p.cuenta]?.nombre}</span>
                        <span style={{ ...styles.flujoMonto, color: "#c0392b" }}>-{fmt(p.debito)}</span>
                      </div>
                    ))
                )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================
const styles = {
  app: { display: "flex", minHeight: "100vh", fontFamily: "'Georgia', serif", background: "#f8fafc", color: "#1e293b" },
  sidebar: { width: 240, background: "#1e293b", display: "flex", flexDirection: "column", padding: "0 0 20px 0", flexShrink: 0 },
  logo: { display: "flex", alignItems: "center", gap: 12, padding: "24px 20px 16px", borderBottom: "1px solid #334155" },
  logoIcon: { fontSize: 32 },
  logoTitle: { fontSize: 18, fontWeight: 700, color: "#f1f5f9", letterSpacing: 1 },
  logoSub: { fontSize: 10, color: "#64748b", letterSpacing: 2 },
  empresaBox: { padding: "12px 16px", borderBottom: "1px solid #334155" },
  empresaInput: { width: "100%", background: "transparent", border: "1px solid #334155", borderRadius: 6, color: "#94a3b8", padding: "6px 8px", fontSize: 12, boxSizing: "border-box" },
  nav: { flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 },
  navBtn: { background: "transparent", border: "none", color: "#94a3b8", textAlign: "left", padding: "10px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, transition: "all 0.15s" },
  navBtnActive: { background: "#334155", color: "#f1f5f9", fontWeight: 600 },
  sidebarFooter: { padding: "16px 20px", borderTop: "1px solid #334155", textAlign: "center" },
  main: { flex: 1, padding: "28px 32px", overflowY: "auto", maxHeight: "100vh" },
  pageTitle: { fontSize: 22, fontWeight: 700, marginBottom: 24, color: "#1e293b", borderBottom: "3px solid #e2e8f0", paddingBottom: 12 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 },
  kpiCard: { background: "#fff", borderRadius: 12, padding: "20px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", textAlign: "center" },
  kpiIcon: { fontSize: 24, marginBottom: 8 },
  kpiValue: { fontSize: 17, fontWeight: 700, marginBottom: 4 },
  kpiLabel: { fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 },
  card: { background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 },
  cardTitle: { fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1, color: "#475569" },
  movRow: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f1f5f9" },
  movBadge: { background: "#334155", color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600 },
  movConcepto: { fontSize: 14, fontWeight: 500 },
  movFecha: { fontSize: 11, color: "#94a3b8" },
  movMonto: { marginLeft: "auto", fontFamily: "monospace", fontWeight: 600, color: "#1a7a4a" },
  empty: { color: "#94a3b8", fontStyle: "italic", fontSize: 13, textAlign: "center", padding: 20 },
  label: { display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  input: { width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 10px", fontSize: 13, color: "#1e293b", background: "#f8fafc", boxSizing: "border-box", outline: "none" },
  row2: { display: "flex", gap: 16 },
  dropdown: { position: "absolute", zIndex: 100, background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 8, maxHeight: 240, overflowY: "auto", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", width: "100%" },
  dropdownItem: { display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", cursor: "pointer", borderBottom: "1px solid #f1f5f9" },
  badge: { borderRadius: 4, padding: "2px 6px", fontSize: 11, color: "#fff", fontWeight: 700, fontFamily: "monospace", flexShrink: 0 },
  tableHeader: { display: "flex", background: "#f1f5f9", borderRadius: "6px 6px 0 0", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 },
  partRow: { display: "flex", alignItems: "center", padding: "6px 10px", borderBottom: "1px solid #f8fafc" },
  totalesRow: { display: "flex", padding: "10px 10px", background: "#f8fafc", borderTop: "2px solid #e2e8f0" },
  balanceIndicator: { padding: "8px 10px", fontSize: 13 },
  actionRow: { display: "flex", gap: 12, justifyContent: "space-between", marginTop: 16 },
  addBtn: { background: "transparent", border: "1.5px dashed #94a3b8", borderRadius: 7, padding: "8px 16px", cursor: "pointer", fontSize: 13, color: "#475569" },
  primaryBtn: { background: "#1e293b", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 600, fontSize: 14 },
  removeBtn: { width: 28, height: 28, border: "none", background: "#fee2e2", color: "#c0392b", borderRadius: 5, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  errorBox: { background: "#fff5f5", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "10px 14px", color: "#c0392b", marginBottom: 14, fontSize: 13 },
  successBox: { background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 8, padding: "10px 14px", color: "#1a7a4a", marginBottom: 14, fontSize: 13 },
  templateBtn: { background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13, color: "#475569" },
  filterBtn: { background: "#f1f5f9", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 12, color: "#64748b" },
  filterBtnActive: { background: "#1e293b", color: "#fff" },
  asientoCard: { background: "#fff", borderRadius: 10, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" },
  asientoHeader: { display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  asientoNum: { fontWeight: 700, fontSize: 12, color: "#1e293b" },
  asientoFecha: { fontSize: 12, color: "#64748b" },
  asientoConcepto: { flex: 1, fontSize: 13, fontWeight: 500 },
  deleteBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: 16 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "#64748b", textAlign: "left", background: "#f8fafc", textTransform: "uppercase", letterSpacing: 0.5 },
  td: { padding: "8px 12px", fontSize: 12, borderBottom: "1px solid #f1f5f9" },
  balRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9" },
  balNombre: { fontSize: 13, color: "#475569" },
  balMonto: { fontFamily: "monospace", fontWeight: 600 },
  balTotal: { display: "flex", justifyContent: "space-between", padding: "12px 0", fontWeight: 700, fontSize: 14, borderTop: "2px solid #e2e8f0", marginTop: 8 },
  pylSection: { marginBottom: 20 },
  pylRow: { display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f8fafc", fontSize: 13 },
  pylTotal: { display: "flex", justifyContent: "space-between", fontWeight: 700, padding: "10px 0", borderTop: "2px solid", marginTop: 8 },
  flujoRow: { display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #f8fafc" },
  flujoDate: { fontSize: 11, color: "#94a3b8", width: 80, flexShrink: 0 },
  flujoDesc: { flex: 1, fontSize: 13 },
  flujoMonto: { fontFamily: "monospace", fontWeight: 600 },
  loadingScreen: { display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f8fafc" },
  spinner: { width: 40, height: 40, border: "4px solid #e2e8f0", borderTopColor: "#1e293b", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
};
