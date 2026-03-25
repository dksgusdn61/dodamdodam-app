//
//  NotificationService.swift
//  NotificationService
//
//  Created by 김민규 on 3/25/26.
//

import UserNotifications

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)

        guard let bestAttemptContent = bestAttemptContent else {
            contentHandler(request.content)
            return
        }

        var imageUrlString: String?

        if let fcmOptions = request.content.userInfo["fcm_options"] as? [String: Any],
           let url = fcmOptions["image"] as? String {
            imageUrlString = url
        } else if let url = request.content.userInfo["image"] as? String {
            imageUrlString = url
        }

        guard let urlString = imageUrlString, let url = URL(string: urlString) else {
            contentHandler(bestAttemptContent)
            return
        }

        downloadImage(url: url) { attachment in
            if let attachment = attachment {
                bestAttemptContent.attachments = [attachment]
            }
            contentHandler(bestAttemptContent)
        }
    }

    override func serviceExtensionTimeWillExpire() {
        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }

    private func downloadImage(url: URL, completion: @escaping (UNNotificationAttachment?) -> Void) {
        URLSession.shared.downloadTask(with: url) { location, _, error in
            guard let location = location, error == nil else {
                completion(nil)
                return
            }

            let ext = url.pathExtension.isEmpty ? "png" : url.pathExtension
            let tmpFile = URL(fileURLWithPath: NSTemporaryDirectory())
                .appendingPathComponent(UUID().uuidString + "." + ext)

            do {
                try FileManager.default.moveItem(at: location, to: tmpFile)
                let attachment = try UNNotificationAttachment(
                    identifier: UUID().uuidString, url: tmpFile, options: nil
                )
                completion(attachment)
            } catch {
                completion(nil)
            }
        }.resume()
    }
}
