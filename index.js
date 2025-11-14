const { GraphQLClient, gql } = require('graphql-request')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const graphQLClient = new GraphQLClient('https://api-stars.github.com/', {
  headers: {
    authorization: `Bearer ${process.env.TOKEN}`
  }
})

/**
 * Method to get all saved contributions from the GitHub Stars API
 * @returns array of all contributions with full details
 */
async function getAllContributions() {
  const query = gql`
    query getContributions {
      contributions {
        id
        type
        date
        title
        description
        url
      }
    }
  `

  const data = await graphQLClient.request(query)
  return data.contributions
}

/**
 * Method to export contributions to a CSV file
 * @param {array} contributions - array of contribution objects
 * @param {string} filename - name of the output CSV file
 */
async function exportToCSV(contributions, filename = 'contributions.csv') {
  const csvWriter = createCsvWriter({
    path: filename,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'type', title: 'Type' },
      { id: 'date', title: 'Date' },
      { id: 'title', title: 'Title' },
      { id: 'description', title: 'Description' },
      { id: 'url', title: 'URL' }
    ]
  })

  await csvWriter.writeRecords(contributions)
  console.log(
    `Successfully exported ${contributions.length} contributions to ${filename}`
  )
}

/**
 * Main function to retrieve all contributions and save them to CSV
 */
async function exportContributionsToCSV() {
  try {
    console.log('Fetching all contributions from GitHub Stars profile...')
    const contributions = await getAllContributions()

    if (contributions.length === 0) {
      console.log('No contributions found in your GitHub Stars profile.')
      return
    }

    console.log(`Found ${contributions.length} contributions.`)
    await exportToCSV(contributions)
  } catch (error) {
    console.error('Error fetching or exporting contributions:', error.message)
    process.exit(1)
  }
}

exportContributionsToCSV()
