import io.javalin.websocket.WsConnectContext;

import java.util.Observable;
import java.util.Observer;

public class ViewerSocket implements Observer {
    private final WsConnectContext ctx;

    public ViewerSocket(WsConnectContext ctx) {
        this.ctx = ctx;
    }

    @Override
    public void update(Observable o, Object arg) {
        ctx.send((String) arg);
    }
}
