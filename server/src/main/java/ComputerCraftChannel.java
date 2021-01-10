import java.util.Observable;

public class ComputerCraftChannel extends Observable {

    private String id;
    private String message;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
            this.message = message;
            setChanged();
            notifyObservers(message);
    }

}
