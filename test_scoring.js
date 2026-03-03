const payloadSQL = {
  nombre: "Test", apellido: "User", email: "test@example.com", telefono: "+12345", empresa: "Corp", web_o_instagram: "corp.com", pais: "USA", 
  privacidad_check: true, whatsapp_optin: true, industria: "Ecommerce", ingresos_mensuales: "50k+", presupuesto_marketing: "5k+", 
  objetivo_principal: ["Más clientes", "Automatizar procesos"], urgencia: "ASAP", interes_capital: "Sí"
};
const payloadLEAD = {
  nombre: "Test", apellido: "User", email: "test@example.com", telefono: "+12345", empresa: "Corp", web_o_instagram: "corp.com", pais: "USA", 
  privacidad_check: true, whatsapp_optin: false, industria: "Otro", ingresos_mensuales: "<5k", presupuesto_marketing: "<500", 
  objetivo_principal: ["Branding"], urgencia: "90 días", interes_capital: "No"
};

async function run() {
  const { calculateScore } = await import('./lib/scoring.ts');
  console.log("SQL Test:", calculateScore(payloadSQL));
  console.log("LEAD Test:", calculateScore(payloadLEAD));
}
run();
