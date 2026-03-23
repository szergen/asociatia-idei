- bdsec-daemon.service - Bitdefender Security Tools Daemon
  Loaded: loaded (/etc/systemd/system/bdsec-daemon.service; enabled; preset: enabled)
  Active: active (running) since Mon 2026-03-23 15:44:34 UTC; 41s ago
  Main PID: 142586 (bdsecd)
  Tasks: 272 (limit: 4096)
  Memory: 1006.9M (peak: 1007.7M)
  CPU: 11.888s
  CGroup: /system.slice/bdsec-daemon.service
  `-bdsec
             |-142586 /opt/bitdefender-security-tools/bin/bdsecd -c /opt/bitdefender-security-tools/etc/bdsecd.json
             |-142714 /opt/bitdefender-security-tools/bin/bdsecd -c /opt/bitdefender-security-tools/etc/bdsecd.json -m antimalware -M
             |-142902 /opt/bitdefender-security-tools/bin/bdsecd -c /opt/bitdefender-security-tools/etc/bdsecd.json -m kpdd
             |-142988 /opt/bitdefender-security-tools/bin/bdsecd -c /opt/bitdefender-security-tools/etc/bdsecd.json -m fanotify -M pkgSlots=6
             `-142990 /opt/bitdefender-security-tools/bin/bdsecd -c /opt/bitdefender-security-tools/etc/bdsecd.json -m ctc -M config=/opt/bitdefe>

Mar 23 15:44:34 idei-1 systemd[1]: Started bdsec-daemon.service - Bitdefender Security Tools Daemon.

- bdsec-update.service - Bitdefender Security Tools Update Service
  Loaded: loaded (/etc/systemd/system/bdsec-update.service; enabled; preset: enabled)
  Active: active (running) since Mon 2026-03-23 15:44:34 UTC; 41s ago
  Main PID: 142588 (updated)
  Tasks: 14 (limit: 18690)
  Memory: 797.5M (peak: 1.3G)
  CPU: 36.940s
  CGroup: /system.slice/bdsec-update.service
  `-142588 /opt/bitdefender-security-tools/bin/updated -c /opt/bitdefender-security-tools/etc/bdsecd.json

Mar 23 15:44:34 idei-1 systemd[1]: bdsec-update.service: This usually indicates unclean termination of a previous run, or service implementation de>
Mar 23 15:44:34 idei-1 systemd[1]: Started bdsec-update.service - Bitdefender Security Tools Update Service.

- bdsec-epagng.service - Bitdefender Security Tools Communication Service
  Loaded: loaded (/etc/systemd/system/bdsec-epagng.service; enabled; preset: enabled)
  Active: active (running) since Mon 2026-03-23 15:44:34 UTC; 41s ago
  Main PID: 142587 (epagngd)
  Tasks: 27 (limit: 18690)
  Memory: 18.2M (peak: 18.9M)
  CPU: 301ms
  CGroup: /system.slice/bdsec-epagng.service
  `-142587 /opt/bitdefender-security-tools/bin/epagngd -c /opt/bitdefender-security-tools/etc/bdsecd.json

Mar 23 15:44:34 idei-1 systemd[1]: Started bdsec-epagng.service - Bitdefender Security Tools Communication Service.
