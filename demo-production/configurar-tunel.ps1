$ErrorActionPreference = 'Stop'
$uri = 'https://api.cloudflare.com/client/v4/accounts/93b35f34d70e99ee00fbd61df696b2be/cfd_tunnel/56cc4242-f586-4c41-af08-8062ba52d31b/configurations'
$secret = Read-Host 'Pega el token temporal de Cloudflare y pulsa Enter' -AsSecureString
try {
    $headers = @{ Authorization = 'Bearer ' + ([PSCredential]::new('token', $secret)).GetNetworkCredential().Password }
    $current = Invoke-RestMethod -Uri $uri -Headers $headers
    if (!$current.success) { throw 'No se pudo leer el tunel.' }
    $cfg = $current.result.config
    $rules = @($cfg.ingress)
    $portal = @($rules | Where-Object { $_.hostname -eq 'demo.zuzudev.pro' -and !$_.path })
    if ($portal.Count -ne 1 -or $portal[0].service -ne 'https://127.0.0.1:9444' -or !$portal[0].originRequest.caPool -or $portal[0].originRequest.noTLSVerify -or $portal[0].originRequest.originServerName -ne 'demo.zuzudev.pro') { throw 'Revisar la ruta TLS del portal antes de continuar.' }
    if ($rules[-1].hostname -or $rules[-1].service -ne 'http_status:404') { throw 'La regla final cambio. Revisar el orden.' }
    $wild = '*.demo.zuzudev.pro'
    if (!@($rules | Where-Object { $_.hostname -eq $wild }).Count) {
        $copy = $portal[0] | ConvertTo-Json -Depth 64 | ConvertFrom-Json
        $copy.hostname = $wild
        $cfg.ingress = @($rules[0..($rules.Count-2)]) + @($copy, $rules[-1])
        $body = @{config=$cfg} | ConvertTo-Json -Depth 64
        $saved = Invoke-RestMethod -Method Put -Uri $uri -Headers $headers -ContentType 'application/json' -Body $body
        if (!$saved.success) { throw 'Cloudflare no confirmo el cambio.' }
    }
    for ($i=0; $i -lt 15; $i++) {
        $local = Invoke-RestMethod 'http://127.0.0.1:20241/config'
        $ok = @($local.config.ingress | Where-Object { $_.hostname -eq $wild -and !$_.path -and $_.service -eq $portal[0].service -and $_.originRequest.caPool -eq $portal[0].originRequest.caPool -and $_.originRequest.originServerName -eq 'demo.zuzudev.pro' -and !$_.originRequest.noTLSVerify -and !$_.originRequest.httpHostHeader })
        if ($ok.Count -eq 1) { Write-Host 'OK: el conector recibio la ruta comodin con TLS verificado.'; return }
        Start-Sleep -Seconds 2
    }
    throw 'La ruta aun no se pudo verificar en el conector local.'
} finally {
    Remove-Variable headers -ErrorAction SilentlyContinue
    $secret.Dispose()
}
