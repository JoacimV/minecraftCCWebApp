local ws, err = http.websocket("ws://vetterlain.dk:8080/websocket/" .. arg[1])
if not ws then
    return printError(err)
end

local function send()
    while true do
        ws.send(textutils.serializeJSON({
            time = textutils.formatTime(os.time()),
            day = os.day(),
            --        position = locate(), only if gps is setup
            label = os.computerLabel()
            --    power = math.floor((power / maxPower) * 100), perform a check to see if we are connected to some kinda power
        }))
        sleep(.3)
    end
end

local function receive()
    while true do
        local command = ws.receive();
        local success, result = pcall(loadstring('return ' .. command))
        if not success then
            ws.send(result)
        else
            ws.send(result)
        end
    end
end

parallel.waitForAll(send, receive)
