const db = require('../database/dbConfig');
class pageDashboardController {


  dashboard(req, res) {
    res.render('pages/dashboard/selectDepartment', {
      title: 'Wybór działu',
      navItems: ''
    });
  }

  async departmentIT(req, res) {
    const tickets = await db.query(
      'SELECT * FROM tickets WHERE dzial_docelowy = ? AND status_zgloszenia = ? or status_zgloszenia = ? ORDER BY data_utworzenia DESC LIMIT 10',
      ['it', 'new', 'in_progress']
    );

    const countRows = await db.query(
      'SELECT COUNT(*) AS count FROM tickets WHERE status_zgloszenia = ?',
      ['new']
    );

    const countNewTickets = countRows[0].count;

    const countRowsInProgres = await db.query(
      'SELECT COUNT(*) AS count FROM tickets WHERE status_zgloszenia = ?',
      ['in_progress']
    );

    const countInProgres = countRowsInProgres[0].count;


    const countRowsCritic = await db.query(
      'SELECT COUNT(*) AS count FROM tickets WHERE priorytet_zgloszenia = ?',
      ['high']
    );

    const countCritic = countRowsCritic[0].count;

    const countRowsDone = await db.query(
      'SELECT COUNT(*) AS count FROM tickets WHERE status_zgloszenia = ?',
      ['closed']
    );

    const countDone = countRowsDone[0].count;


    const categories = [
      'serwis',
      'drukarki',
      'amms',
      'infomedica',
      'aktulizacja',
      'przenosiny',
      'Ris/Pacs',
      'inne'
    ];

    const categoryCounts = {};

    for (const category of categories) {
      const [row] = await db.query(
        'SELECT COUNT(*) AS count FROM tickets WHERE kategoria_zgloszenia = ? and (status_zgloszenia = ? or status_zgloszenia = ?)',

        [category, 'new', 'in_progress']
      );
      categoryCounts[category] = row.count;
    }



    res.render('pages/dashboard/it', {
      title: 'Dział IT - Nowe zgłoszenia',
      navItems: '',
      layout: 'layouts/dashboardLayouts',
      tickets,
      countNewTickets,
      countInProgres,
      countCritic,
      countDone,
      categoryCounts
    });
  }

  departmentElec(req, res) {
    res.render('pages/dashboard/electrical', {
      title: 'Dział Elektryczny',
      layout: 'layouts/dashboardLayouts',
      navItems: ''
    });
  }



  departmentMe(req, res) {
    res.render('pages/dashboard/medicalEquipment', {
      title: 'Dział Aparatury Medycznej',
      navItems: '',
      layout: 'layouts/dashboardLayouts'
    });
  }
  departmentConst(req, res) {
    res.render('pages/dashboard/construction', {
      title: 'Dział Budowlany',
      navItems: '',
      layout: 'layouts/dashboardLayouts'
    });
  }
  departmentcybe(req, res) {
    res.render('pages/dashboard/cybersecurity', {
      title: 'Dział Cyberbezpieczeństwa',
      navItems: '',
      layout: 'layouts/dashboardLayouts'
    });
  }



  async departmentDashboard(req, res) {
    const departmentMap = {
      it: {
        id: 'it',
        name: 'Dział IT',
        categories: [
          {
            key: 'serwis',
            name: 'Serwis',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>'
          },
          {
            key: 'drukarki',
            name: 'Drukarki',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z"/></svg>'
          },
          {
            key: 'amms',
            name: 'AMMS',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z"/></svg>'
          },
          {
            key: 'infomedica',
            name: 'Infomedica',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm80-80h480v-80H240v80Zm0-160h160v-240H240v240Zm240 0h240v-80H480v80Zm0-160h240v-80H480v80ZM160-200v-560 560Z"/></svg>'
          },
          {
            key: 'aktulizacja',
            name: 'Aktualizacja',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-120v-80l40-40H160q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h320v80H160v440h640v-120h80v120q0 33-23.5 56.5T800-240H680l40 40v80H240Zm360-240L400-560l56-56 104 103v-327h80v327l104-103 56 56-200 200Z"/></svg>'
          },
          {
            key: 'przenosiny',
            name: 'Przenosiny',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z"/></svg>'
          },
          {
            key: 'RisPacs',
            name: 'RIS / PACS',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M183-380q-8 4-16.5.5T155-391l-30-80q-5-14-4.5-27.5T133-517q25-10 46.5 7t32.5 44l16 43q3 8 .5 14.5T219-398l-36 18ZM433-80q-17 0-33.5-7T372-107L210-294q-11-13-10-29t14-27q13-11 29-9.5t27 13.5l90 103q0-8 2-15.5t6-15.5l-46-132q-5-16 2-31t23-20q16-5 31 2t20 23l39 112h23v-120q0-17 11.5-28.5T500-480q17 0 28.5 11.5T540-440v120h24l21-89q4-17 17.5-25.5T633-439q17 4 25.5 17.5T663-391l-16 71q5 1 10.5 2t10.5 3l15-39q6-16 21-23t31-1q15 6 21.5 21t.5 31l-37 98v68q0 33-23.5 56.5T640-80H433ZM311-699q-8 1-14.5-4.5T289-717l-9-79q-2-17 8.5-29.5T316-840q17-2 29.5 8.5T360-804l8 79q1 8-4.5 14.5T350-703l-39 4Zm22 204q-9 2-16.5-3t-8.5-14l-12-104q-2-17 8.5-29.5T332-660q17-2 29.5 8.5T376-624l11 97q1 8-3 14t-12 8l-39 10Zm107 335h200v-80H440v80Zm40-360q-8 0-14-6t-6-14v-100q0-17 11.5-28.5T500-680q17 0 28.5 11.5T540-640v100q0 8-6 14t-14 6h-40Zm0-200q-8 0-14-6t-6-14v-100q0-17 11.5-28.5T500-880q17 0 28.5 11.5T540-840v100q0 8-6 14t-14 6h-40Zm175 246-40-10q-8-2-12-8t-3-14l11-98q2-17 14.5-27.5T655-640q17 2 27.5 14.5T691-596l-11 105q-1 9-8.5 14t-16.5 3Zm23-201-40-4q-8-1-13.5-7.5T620-701l8-79q2-17 14.5-27.5T672-816q17 2 27.5 14.5T708-772l-8 79q-1 8-7.5 13.5T678-675Zm80 265-39-12q-8-2-11.5-9t-1.5-15l15-56q5-16 19-24.5t30-3.5q16 5 24 18.5t4 29.5l-15 58q-2 8-9.5 12t-15.5 2Zm42-151-39-10q-8-2-12-9.5t-2-15.5l13-46q7-24 17-45t31-16q25 6 30 33t-3 56l-11 39q-2 8-9 12t-15 2ZM440-160h200-200Z"/></svg>'
          },
          {
            key: 'inneIt',
            name: 'inne',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>'
          },
        ]
      },
      electrical: {
        id: 'electrical',
        name: 'Dział Elektryczny',
        categories: [
          { key: 'awaria_oswietlenia', name: 'Awaria oświetlenia', icon: '💡' },
          { key: 'gniazdka', name: 'Gniazdka i okablowanie', icon: '🔌' },
          { key: 'instalacje', name: 'Nowe instalacje', icon: '⚡' },
          { key: 'ups', name: 'UPS / Zasilanie awaryjne', icon: '🔋' },
        ]
      },
      medical: {
        id: 'medical_equipment',
        name: 'Dział Aparatury Medycznej',
        categories: [
          { key: 'usg', name: 'USG', icon: '📡' },
          { key: 'rtg', name: 'RTG', icon: '☢️' },
          { key: 'kardiomonitory', name: 'Kardiomonitory', icon: '❤️' },
          { key: 'pompy_inf', name: 'Pompy infuzyjne', icon: '💉' },
          { key: 'defibrylatory', name: 'Defibrylatory', icon: '🫀' },
        ]
      },
      construction: {
        id: 'construction',
        name: 'Dział Budowlany',
        categories: [
          { key: 'malowanie', name: 'Malowanie', icon: '🎨' },
          { key: 'remont', name: 'Remont', icon: '🔨' },
          { key: 'instalacje', name: 'Instalacje sanitarne', icon: '🚰' },
        ]
      },
      cybersecurity: {
        id: 'cybersecurity',
        name: 'Dział Cyberbezpieczeństwa',
        categories: [
          { key: 'phishing', name: 'Phishing', icon: '🎣' },
          { key: 'uprawnienia', name: 'Uprawnienia', icon: '🔑' },
          { key: 'incydent', name: 'Incydent bezpieczeństwa', icon: '🚨' },
          { key: 'vpn', name: 'VPN / Dostęp zdalny', icon: '🌐' },
        ]
      }
    };

    const deptKey = req.params.dept;
    const dept = departmentMap[deptKey];

    if (!dept) {
      return res.status(404).render('errors/404',
        {
          title: 'strona nie odnaleziona',
          layout: 'layouts/errorLayouts'
        }
      )
    }

    // Pobierz najnowsze zgłoszenia tylko dla danego działu
    const tickets = await db.query(
      `SELECT * FROM tickets 
     WHERE dzial_docelowy = ? 
     AND (status_zgloszenia = ? OR status_zgloszenia = ?) 
     ORDER BY data_utworzenia DESC 
     LIMIT 10`,
      [dept.id, 'new', 'in_progress']
    );

    // Liczniki 

    const [newRow] = await db.query(
      'SELECT COUNT(*) AS count FROM tickets WHERE dzial_docelowy = ? AND status_zgloszenia = ? ',
      [dept.id, 'new']
    );
    const countNewTickets = newRow.count;

    const [progRow] = await db.query(
      'SELECT COUNT(*) AS count FROM tickets WHERE dzial_docelowy = ? AND status_zgloszenia = ?',
      [dept.id, 'in_progress']
    );
    const countInProgres = progRow.count;

    const [critRow] = await db.query(
      'SELECT COUNT(*) AS count FROM tickets WHERE dzial_docelowy = ? AND priorytet_zgloszenia = ?',
      [dept.id, 'high']
    );
    const countCritic = critRow.count;

    const [doneRow] = await db.query(
      'SELECT COUNT(*) AS count FROM tickets WHERE dzial_docelowy = ? AND status_zgloszenia = ?',
      [dept.id, 'closed']
    );
    const countDone = doneRow.count;

    const categoryCounts = {};

    for (const cat of dept.categories) {
      const [row] = await db.query(
        `SELECT COUNT(*) AS count 
     FROM tickets 
     WHERE dzial_docelowy = ? 
       AND kategoria_zgloszenia = ? 
       AND (status_zgloszenia = 'new' OR status_zgloszenia = 'in_progress')`,
        [dept.id, cat.key]
      );

      categoryCounts[cat.key] = row.count || 0;
    }

    res.render('pages/dashboard/departmentDashboard', {
      title: dept.name,
      countNewTickets,
      countInProgres,
      countCritic,
      countDone,
      categoryCounts,
      categories: dept.categories,
      tickets,
      layout: 'layouts/dashboardLayouts'
    });
  }
}

module.exports = new pageDashboardController();