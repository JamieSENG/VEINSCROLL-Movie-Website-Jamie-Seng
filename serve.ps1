# Simple HTTP server using PowerShell
Add-Type -AssemblyName System.Web

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()

Write-Host "Server running on http://localhost:8080"
Write-Host "Press Ctrl+C to stop the server"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Determine the file to serve
        $localPath = Join-Path $PWD ($request.Url.LocalPath -replace '^/', '')
        if ($localPath -eq '' -or $localPath -eq '\') {
            $localPath = 'index.html'
        }
        
        if (Test-Path $localPath) {
            try {
                $content = [IO.File]::ReadAllBytes($localPath)
                $response.ContentType = [System.Web.MimeMapping]::GetMimeMapping($localPath)
                $response.ContentLength64 = $content.Length
                $response.OutputStream.Write($content, 0, $content.Length)
            } catch {
                $response.StatusCode = 500
                $response.StatusDescription = 'Internal Server Error'
            }
        } else {
            $response.StatusCode = 404
            $response.StatusDescription = 'Not Found'
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
}
