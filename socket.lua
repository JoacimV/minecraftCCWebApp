local ws, err =
http.websocket("ws://104.248.249.171:8080/websocket/"..arg[1])
if not ws then
    return printError(err)
end

while true do
    ws.send(textutils.serializeJSON({
        time = textutils.formatTime(os.time()),
        day = os.day(),
--        position = locate(), only if gps is setup
        label = os.computerLabel()
        --    power = math.floor((power / maxPower) * 100), perform a check to see if we are connected to some kinda power
    }))
    sleep(.5)
end
