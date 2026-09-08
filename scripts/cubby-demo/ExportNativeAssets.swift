import SwiftUI
import AppKit

@main struct ExportDemoAssets {
    @MainActor static func png<V: View>(_ view: V, name: String, width: CGFloat, height: CGFloat) {
        let renderer = ImageRenderer(content: view.environment(\.colorScheme, .light).frame(width: width, height: height))
        renderer.scale = 4
        guard let cg = renderer.cgImage else { fatalError("Could not render \(name)") }
        let data = NSBitmapImageRep(cgImage: cg).representation(using: .png, properties: [:])!
        try! data.write(to: URL(fileURLWithPath: CommandLine.arguments[1]).appendingPathComponent(name + ".png"))
    }
    @MainActor static func main() {
        _ = NSApplication.shared
        let chrome = ZStack {
            WoodBackground(style: .honeyPine)
            VStack(spacing: 0) {
                Color.clear.frame(height: 44)
                ForegroundPanelBackground()
                    .overlay(ForegroundPanelBevel())
                    .shadow(color: .black.opacity(0.10), radius: 14, y: 4)
                    .padding(.horizontal, 5).padding(.bottom, 5)
            }
        }
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous).strokeBorder(LinearGradient(colors: [Color(red: 1, green: 0.82, blue: 0.28).opacity(0.94), Color(red: 0.82, green: 0.43, blue: 0.04).opacity(0.72)], startPoint: .top, endPoint: .bottom), lineWidth: 1.35))
        png(chrome, name: "native-chrome", width: 360, height: 480)
        for (name, symbol) in [("clipboard", "list.clipboard"), ("screenshots", "photo"), ("notes", "note.text")] {
            png(Image(systemName: symbol).font(.system(size: 11, weight: .semibold)).foregroundStyle(.black), name: name, width: 14, height: 14)
        }
        for (name, symbol) in [("copy", "square.on.square"), ("delete", "trash"), ("check", "checkmark")] {
            png(Image(systemName: symbol).font(.system(size: 10, weight: .medium)).foregroundStyle(.black), name: name, width: 22, height: 22)
        }
        png(Image(systemName: "arrow.up").font(.system(size: 11, weight: .bold)).foregroundStyle(.black), name: "submit", width: 21, height: 21)
    }
}
