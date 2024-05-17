const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("admin connecting...");
  admin.connect();
  console.log("admin connected ..");

  await admin.createTopics({
      topics: [
        {
          topic: "rider-updates",
          numPartitions: 2,
        },
      ],
    });
    console.log("admin createTopics done..");
    
    await admin.disconnect();
    console.log("admin disconnected..");
}

init();











// SELECT 
//       s.*,
//       JSON_ARRAYAGG(
//         JSON_OBJECT(
//           'id', CASE 
//                   WHEN su.userId IS NULL THEN su.id 
//                   ELSE asu.id 
//                 END,
//           'name', CASE 
//                     WHEN su.userId IS NULL THEN su.name 
//                     ELSE asu.name 
//                   END,
//           'email', CASE 
//                      WHEN su.userId IS NULL THEN NULL 
//                      ELSE asu.email 
//                    END,
//           'role', CASE 
//                     WHEN su.userId IS NULL THEN 'guest' 
//                     ELSE asu.role 
//                   END,
//           'picture', CASE 
//                        WHEN su.userId IS NULL THEN NULL 
//                        ELSE asu.picture 
//                      END
//         )
//       ) as activeMembers,
//       JSON_OBJECT(
//         'id', u.id,
//         'name', u.name,
//         'email', u.email
//       ) as host
//     FROM 
//       codesync_db.session s
//     JOIN 
//       codesync_db.sessionuser su ON s.id = su.sessionId
//       LEFT JOIN 
//       codesync_db.users asu ON asu.id = su.userId 
//     LEFT JOIN 
//       codesync_db.users u ON u.id = s.ownerId
//     WHERE 
//       su.isActive = TRUE AND (asu.id != u.id OR asu.id is null) 
//     GROUP BY 
//       s.id
//     ORDER BY 
//       s.createdAt DESC;


// activeMembers": "[{\"id\": \"afe3926c-a7e5-47ee-9263-0826f0022c33\", \"name\": \"test newly\", \"role\": \"guest\", \"email\": null, \"picture\": null}]




// JSON_ARRAYAGG(
//     JSON_OBJECT(
//       'id', COALESCE(asu.id, su.id),
//       'name', COALESCE(asu.name, su.name),
//       'email', asu.email,
//       'role', COALESCE(asu.role, 'guest'),
//       'picture', asu.picture
//     )
//   ) AS activeMembers