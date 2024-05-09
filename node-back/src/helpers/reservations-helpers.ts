const fs = require('fs');

export function parseData(productAssignment, req, res) {
  return fs.readFile(productAssignment, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ error: 'File not found' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }

    let productAssignmentJsonData;
    try {
      productAssignmentJsonData = JSON.parse(data);
    } catch (parseError) {
      return res.status(400).json({ error: 'Invalid JSON data' });
    }
    res.status(200).json(productAssignmentJsonData);
  })
}
