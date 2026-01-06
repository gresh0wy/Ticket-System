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
          { key: 'serwis', name: 'Serwis', icon: '🖥️' },
          { key: 'drukarki', name: 'Drukarki', icon: '🖨️' },
          { key: 'amms', name: 'AMMS', icon: '🧪' },
          { key: 'infomedica', name: 'Infomedica', icon: '💊' },
          { key: 'aktulizacja', name: 'Aktualizacja', icon: '🔄' },
          { key: 'przenosiny', name: 'Przenosiny', icon: '🚚' },
          { key: 'Ris/Pacs', name: 'RIS / PACS', icon: '🩻' },
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
      'SELECT COUNT(*) AS count FROM tickets WHERE dzial_docelowy = ? AND status_zgloszenia = ? or status_zgloszenia = ?',
      [dept.id, 'new', 'in_progress']
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