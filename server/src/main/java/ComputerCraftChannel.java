import io.javalin.websocket.WsMessageContext;

import java.util.Observable;

public class ComputerCraftChannel extends Observable {

    private String id;
    private String message;
    private WsMessageContext ctx;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public WsMessageContext getCtx() {
        return ctx;
    }

    public void setCtx(WsMessageContext ctx) {
        this.ctx = ctx;
    }

    public void setMessage(String message) {
            this.message = message;
            setChanged();
            notifyObservers(message);
    }

}
