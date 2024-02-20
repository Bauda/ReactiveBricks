# Specify the directory path
$directoryPath = "./"

# Recursively gather file names matching the criteria
$relativePaths = (Get-ChildItem -Path $directoryPath -Recurse *.* | Where-Object { $_.Name -match '(?i)Policy' -and $_.Name -match '.html' } | Resolve-Path -Relative) -replace "\.\\","" -replace "\\", "/"

# Convert relative paths to JSON format
$jsonData = $relativePaths | ConvertTo-Json

# Write JSON to file
$jsonData | Out-File -FilePath "policies.json" -Encoding utf8

# Notify user
Write-Host "JSON file created successfully."