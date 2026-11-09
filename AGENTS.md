<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Purchase notifications use verified Cakto webhooks, server-only consent matching, and an anonymous RPC returning abbreviated names only; never seed purchase activity or expose customer payloads.
- Mount purchase notifications only on the sales page, using chained randomized timers and session deduplication so checkout and other pages stay notification-free.
- Offer checkout links use the shared Button with dedicated offer variants and global semantic tokens, keeping CTA hierarchy isolated from other page buttons.
