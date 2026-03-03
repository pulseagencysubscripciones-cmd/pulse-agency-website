import fs from 'fs';
import path from 'path';

// Helper simple parser for .env
function getEnv(key) {
    try {
        const env = fs.readFileSync('.env', 'utf8');
        const match = env.match(new RegExp(`${key}=(.*)`));
        return match ? match[1].trim().replace(/['"]/g, '') : null;
    } catch (e) { return null; }
}

async function run() {
    const token = getEnv('CALENDLY_TOKEN');

    if (!token || token === 'vuestro_token_aqui') {
        console.error('❌ ERROR: CALENDLY_TOKEN no encontrado en el archivo .env');
        console.log('Por favor, pega tu Personal Access Token en el .env primero.');
        process.exit(1);
    }

    console.log('🔗 Conectando con Calendly...');

    try {
        // 1. Get User info (handles getting the Organization URI)
        const userRes = await fetch('https://api.calendly.com/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!userRes.ok) throw new Error('Token inválido o sin permisos.');
        const userData = await userRes.json();
        const orgUri = userData.resource.current_organization;

        console.log('✅ Organización encontrada:', orgUri);

        // 2. List Event Types for this organization
        const eventsRes = await fetch(`https://api.calendly.com/event_types?organization=${orgUri}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const eventsData = await eventsRes.json();

        // Buscamos el evento que linkeaste: /pulseagencyllc/30min
        const targetSlug = '30min';
        const targetEvent = eventsData.collection.find(e => e.slug === targetSlug);

        if (!targetEvent) {
            console.log('⚠️ No encontré un evento con el slug "30min". Aquí están tus eventos disponibles:');
            eventsData.collection.forEach(e => console.log(`- ${e.name} (slug: ${e.slug}) -> URI: ${e.uri}`));
            process.exit(1);
        }

        console.log('\n🚀 ¡TODO LISTO! Copia estos valores en tu archivo .env:\n');
        console.log(`CALENDLY_ORG_URI=${orgUri}`);
        console.log(`CALENDLY_EVENT_TYPE_URI=${targetEvent.uri}`);
        console.log(`CALENDLY_SCHEDULING_LINK=https://calendly.com/pulseagencyllc/30min`);
        console.log('\n--------------------------------------------------\n');

    } catch (error) {
        console.error('❌ Error al configurar Calendly:', error.message);
    }
}

run();
