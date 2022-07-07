addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

 function sortFunction(a, b) {
  if (a[1] === b[1]) {
      return 0;
  }
  else {
      return (a[1] < b[1]) ? -1 : 1;
  }
}

async function handleRequest(request) {
  gradesData = await request.text()
  rows = gradesData.slice(gradesData.indexOf("\n") + 1).split("\n")

  finalData = []

  rows.forEach(row => {
    if(row.length > 0) {
      rowArray = row.split(",")
      
      student = rowArray[0]
      grades = rowArray.slice(1)
      average = (grades.reduce((ps, a) => ps += Number(a), 0) / grades.length).toFixed(3)

      finalData.push([student, average, grades])
    }
  })

  finalData.sort(sortFunction)

  resp = ""
  finalData.forEach(row => {
    resp += row[0] + ", " + row[1] + "\n"
  })

  return new Response(resp, {
    headers: { 'content-type': 'text/plain' },
  })
}
