import natural from 'natural';

// Sample employee data
// Function to get content-based recommendations
export function getRecommendations(name) {


    const employeeData = [
        {
            'Employee ID': 1,
            'Employee Name': 'Alice',
            'Skills': ['Python', 'SQL'],
            'Experience': [3, 2, 1],
            'Major': "Master's",
            'Job Interests': 'Data Scientist',
            'Location': 'New York',
            'Employment Type': 'Full Time',
            'Salary Expectations': '$80k - $100k',
            'Preferred Industry': 'Technology'
        },
        // ... other employee data
    ];

    // Sample employer data
    const employerData = [
        {
            'Job ID': 101,
            'Company Name': 'TechCo',
            'Job Title': 'Software Engineer',
            'Required Skills': ['Python', 'SQL'],
            'Experience Level': 'Intermediate',
            'Education Level': "Bachelor's",
            'Location': 'San Francisco',
            'Employment Type': 'Full Time',
            'Salary Range': '$90k - $110k',
            'Industry': 'Technology'
        },
        // ... other employer data
    ];

    // Combine employee and employer data into a single array
    const data = employeeData.map((element, i) => {
        return { ...element, ...employerData[i] }
    })
    console.log("ggggggggggggggggggdata", data)
    // Preprocess text-based columns
    const textColumns = ['Skills', 'Job Interests', 'Preferred Industry', 'Required Skills'];
    data.forEach(entry => {
        textColumns.forEach(col => {
            if (Array.isArray(entry[col])) {
                entry[col] = entry[col].join(' ');
            }
        });
    });

    // Create a TF-IDF instance
    const tfidf = new natural.TfIdf();

    // Add documents (rows) to the TF-IDF instance
    data.forEach(entry => {
        tfidf.addDocument(entry['Skills'] + ' ' +
            entry['Job Interests'] + ' ' +
            entry['Preferred Industry'] + ' ' +
            entry['Required Skills']);
    });


    data.forEach(entry => {
        const concatenated = entry['Employee Name'] + ' ' + entry['Job Title'];
        console.log(`Concatenated: ${concatenated}, Input: ${name}, Match: ${concatenated === name}`);
    });

    const index = data.findIndex(entry => entry['Employee Name'] + ' ' + entry['Job Title'] === name);
    console.log("index", index)

    if (index === -1) {
        return [];
    }

    const queryDocument = data[index]['Skills'] + ' ' +
        data[index]['Job Interests'] + ' ' +
        data[index]['Preferred Industry'] + ' ' +
        data[index]['Required Skills'];

    // const similarIndices = tfidf.listDocumentsBySimilarity(queryDocument)
    //     .filter(item => item.documentIndex !== index)
    //     .map(item => item.documentIndex)
    //     .slice(0, 10);

    // return similarIndices.map(index => data[index]['Employee Name']);
    return queryDocument;
}



