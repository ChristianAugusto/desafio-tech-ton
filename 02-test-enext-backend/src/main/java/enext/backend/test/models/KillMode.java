package enext.backend.test.models;

public class KillMode {
    private String mode;
    private int quantity;

    public KillMode(String mode, int quantity) {
        this.setMode(mode);
        this.setQuantity(quantity);
    }


    public String getMode() {
        return this.mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = Math.abs(quantity);
    }


    public String toString() {
        return "\"" + this.getMode() + "\": " + this.getQuantity();
    }
}