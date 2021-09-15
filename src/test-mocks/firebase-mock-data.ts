/*
 Data features...
    -   two users
    -   one practice session (today)
    -   three assignments
*/

export const firebase_mock = {
    users: [
        {
            id: 'u1',
            instrument: 'violin',
            is_teacher: true,
            is_student: false,
            name: 'Test Teacher',
            photo_url: 'https://images.amcnetworks.com/bbcamerica.com/wp-content/uploads/2013/11/eleventhdoctor.jpg',
            preferred_practice_chunk: 3,
            preferred_practice_duration: 30,
            student_list: [],
            teacher_list: [],
            unique_email: 'matt@tardis.u'
        },
        {
            id: 'u2',
            instrument: 'violin',
            is_teacher: false,
            is_student: true,
            name: 'Test Student',
            photo_url: 'https://static.tvtropes.org/pmwiki/pub/images/doc_compan_4852.png',
            preferred_practice_chunk: 3,
            preferred_practice_duration: 30,
            student_list: [],
            teacher_list: [],
            unique_email: 'amy@tardis.u'
        }
    ],
    practice_session: [
        {
            id: 'ps1',
            date_created: new Date().getTime(), // milliseconds since linux epoch
            user_id: 'u1',
            items: [
                {
                    assignment_id: 'a3',
                    minutes: 3,
                    current: false,
                    completed: true,
                },
                {
                    assignment_id: 'a3',
                    minutes: 3,
                    current: true,
                    completed: false,
                }
            ],  
            finished: false,
        }
    ],
    assignments: [
        {
            id: 'a1',
            assigned_by_id: 'u1',
            assigned_to_id: 'u2',
            category: 'test',
            current: true,
            description: 'test description 1',
            name: 'test name 1',
        },
        {
            id: 'a2',
            assigned_by_id: 'u1',
            assigned_to_id: 'u2',
            category: 'test',
            current: true,
            description: 'test description 2',
            name: 'test name 2',
        },
        {
            id: 'a3',
            assigned_by_id: 'u1',
            assigned_to_id: 'u1',
            category: 'test',
            current: true,
            description: 'test description 3',
            name: 'test name 3',
        }
    ]
}